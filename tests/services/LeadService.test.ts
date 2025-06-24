import { expect } from 'chai';
import sinon from 'sinon';
import { LeadResolver } from '../../src/resolvers/LeadResolver';
import { LeadService } from '../../src/services/LeadService';
import { Lead, ServiceType } from '../../src/entities/Lead';
import { RegisterLeadInput } from '../../src/types/LeadTypes';

describe('LeadResolver', () => {
  let leadResolver: LeadResolver;
  let mockLeadService: sinon.SinonStubbedInstance<LeadService>;

  beforeEach(() => {
    // Create a stubbed LeadService
    mockLeadService = {
      createLead: sinon.stub(),
      getAllLeads: sinon.stub(),
      getLeadById: sinon.stub(),
      getLeadByEmail: sinon.stub(),
    } as any;

    leadResolver = new LeadResolver();
    // Replace the leadService instance with our mock
    (leadResolver as any).leadService = mockLeadService;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('register', () => {

    it('should successfully register a new lead when email does not exist', async () => {
      // Arrange
      const input: RegisterLeadInput = {
        name: 'John Cabling',
        email: 'johncabling@example.com',
        mobile: '09654717066',
        postcode: '1200',
        services: [ServiceType.DELIVERY, ServiceType.PAYMENT, ServiceType.PICKUP]
      };

      const expectedLead: Lead = {
        id: 5,
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockLeadService.getLeadByEmail.resolves(null); // Email doesn't exist
      mockLeadService.createLead.resolves(expectedLead);

      // Act
      const result = await leadResolver.register(input);

      // Assert
      expect(mockLeadService.getLeadByEmail.calledOnceWith(input.email)).to.be.true;
      expect(mockLeadService.createLead.calledOnceWith(input)).to.be.true;
      expect(result).to.deep.equal(expectedLead);
    });

    it('should throw error when email already exists', async () => {
      // Arrange
      const input: RegisterLeadInput = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '2000',
        services: [ServiceType.DELIVERY]
      };

      const existingLead: Lead = {
        id: 2,
        name: 'Existing User',
        email: input.email,
        mobile: '0987654321',
        postcode: '3000',
        services: [ServiceType.PICKUP],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockLeadService.getLeadByEmail.resolves(existingLead);

      // Act & Assert
      try {
        await leadResolver.register(input);
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        // expect(error.message).to.equal('Email already registered');
        expect((error as Error).message).to.include('Email already registered');
        expect(mockLeadService.getLeadByEmail.calledOnceWith(input.email)).to.be.true;
        expect(mockLeadService.createLead.called).to.be.false;
      }
    });

    it('should handle service errors during email check', async () => {
      // Arrange
      const input: RegisterLeadInput = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '2000',
        services: [ServiceType.DELIVERY]
      };

      mockLeadService.getLeadByEmail.rejects(new Error('Database connection failed'));

      // Act & Assert
      try {
        await leadResolver.register(input);
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect((error as Error).message).to.include('Database connection failed');
        // expect(error.message).to.equal('Database connection failed');
        expect(mockLeadService.getLeadByEmail.calledOnceWith(input.email)).to.be.true;
        expect(mockLeadService.createLead.called).to.be.false;
      }
    });

    it('should handle service errors during lead creation', async () => {
      // Arrange
      const input: RegisterLeadInput = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '2000',
        services: [ServiceType.PAYMENT]
      };

      mockLeadService.getLeadByEmail.resolves(null);
      mockLeadService.createLead.rejects(new Error('Failed to save lead'));

      // Act & Assert
      try {
        await leadResolver.register(input);
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect((error as Error).message).to.include('Failed to save lead');
        // expect(error.message).to.equal('Failed to save lead');
        expect(mockLeadService.getLeadByEmail.calledOnceWith(input.email)).to.be.true;
        expect(mockLeadService.createLead.calledOnceWith(input)).to.be.true;
      }
    });
  });

  describe('leads', () => {
    it('should successfully return all leads', async () => {
      // Arrange
      const expectedLeads: Lead[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          mobile: '1234567890',
          postcode: '2000',
          services: [ServiceType.DELIVERY],
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date('2024-02-01')
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          mobile: '0987654321',
          postcode: '3000',
          services: [ServiceType.PICKUP, ServiceType.PAYMENT],
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        }
      ];

      mockLeadService.getAllLeads.resolves(expectedLeads);

      // Act
      const result = await leadResolver.leads();

      // Assert
      expect(mockLeadService.getAllLeads.calledOnce).to.be.true;
      expect(result).to.deep.equal(expectedLeads);
    });

    it('should return empty array when no leads exist', async () => {
      // Arrange
      mockLeadService.getAllLeads.resolves([]);

      // Act
      const result = await leadResolver.leads();

      // Assert
      expect(mockLeadService.getAllLeads.calledOnce).to.be.true;
      expect(result).to.be.an('array').that.is.empty;
    });

    it('should handle service errors when retrieving all leads', async () => {
      // Arrange
      mockLeadService.getAllLeads.rejects(new Error('Service unavailable'));

      // Act & Assert
      try {
        await leadResolver.leads();
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect((error as Error).message).to.include('Service unavailable');
        // expect(error.message).to.equal('Service unavailable');
        expect(mockLeadService.getAllLeads.calledOnce).to.be.true;
      }
    });
  });

  describe('lead', () => {
    it('should successfully return a lead when found', async () => {
      // Arrange
      const leadId = 2;
      const expectedLead: Lead = {
        id: leadId,
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        postcode: '2000',
        services: [ServiceType.DELIVERY, ServiceType.PAYMENT],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockLeadService.getLeadById.resolves(expectedLead);

      // Act
      const result = await leadResolver.lead(leadId);

      // Assert
      expect(mockLeadService.getLeadById.calledOnceWith(leadId)).to.be.true;
      expect(result).to.deep.equal(expectedLead);
    });

    it('should return null when lead is not found', async () => {
      // Arrange
      const leadId = 999;
      mockLeadService.getLeadById.resolves(null);

      // Act
      const result = await leadResolver.lead(leadId);

      // Assert
      expect(mockLeadService.getLeadById.calledOnceWith(leadId)).to.be.true;
      expect(result).to.be.null;
    });

    it('should handle service errors when retrieving lead by id', async () => {
      // Arrange
      const leadId = 1;
      mockLeadService.getLeadById.rejects(new Error('Lead service error'));

      // Act & Assert
      try {
        await leadResolver.lead(leadId);
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect((error as Error).message).to.include('Lead service error');
        // expect(error.message).to.equal('Lead service error');
        expect(mockLeadService.getLeadById.calledOnceWith(leadId)).to.be.true;
      }
    });

    it('should handle invalid lead id types gracefully', async () => {
      // Arrange
      const invalidLeadId = -1;
      mockLeadService.getLeadById.resolves(null);

      // Act
      const result = await leadResolver.lead(invalidLeadId);

      // Assert
      expect(mockLeadService.getLeadById.calledOnceWith(invalidLeadId)).to.be.true;
      expect(result).to.be.null;
    });

  });
});