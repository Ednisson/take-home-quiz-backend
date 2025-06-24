import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { Lead } from '../entities/Lead';
import { RegisterLeadInput } from '../types/LeadTypes';
import { LeadService } from '../services/LeadService';

@Resolver(() => Lead)
export class LeadResolver {
  private leadService: LeadService;

  constructor() {
    this.leadService = new LeadService();
  }

  @Mutation(() => Lead)
  async register(@Arg('input') input: RegisterLeadInput): Promise<Lead> {
    // Check if email already exists
    const existingLead = await this.leadService.getLeadByEmail(input.email);
    if (existingLead) {
      throw new Error('Email already registered');
    }
    
    return await this.leadService.createLead(input);
  }

  @Query(() => [Lead])
  async leads(): Promise<Lead[]> {
    return await this.leadService.getAllLeads();
  }

  @Query(() => Lead, { nullable: true })
  async lead(@Arg('id', () => Int) id: number): Promise<Lead | null> {
    return await this.leadService.getLeadById(id);
  }
}