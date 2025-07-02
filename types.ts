export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

export interface Evidence {
  httpRequest: string;
  httpResponse: string;
  screenshotDescription: string;
}

export interface VulnerabilityFinding {
  vulnerability: string;
  severity: SeverityLevel;
  description: string;
  remediation: string;
  confidence: 'High' | 'Medium' | 'Low';
  affectedUrl: string;
  risk: string;
  cvssScore: number;
  referenceLinks: string[];
  evidence: Evidence;
}
