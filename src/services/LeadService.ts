import { Repository } from 'typeorm';
import { Lead } from '../entities/Lead';
import { RegisterLeadInput } from '../types/LeadTypes';
import { AppDataSource } from '../data-source';

export class LeadService {
  private leadRepository: Repository<Lead>;

  constructor() {
    this.leadRepository = AppDataSource.getRepository(Lead);
  }

  async createLead(input: RegisterLeadInput): Promise<Lead> {
    const lead = this.leadRepository.create(input);
    return await this.leadRepository.save(lead);
  }

  async getAllLeads(): Promise<Lead[]> {
    return await this.leadRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async getLeadById(id: number): Promise<Lead | null> {
    return await this.leadRepository.findOne({ where: { id } });
  }

  async getLeadByEmail(email: string): Promise<Lead | null> {
    return await this.leadRepository.findOne({ where: { email } });
  }
}