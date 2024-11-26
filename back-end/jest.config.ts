import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',                
  testEnvironment: 'node',          
  verbose: true,                    
  moduleFileExtensions: ['ts', 'js'], 
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], 
  collectCoverage: true,            
  coverageDirectory: 'coverage',  
  moduleNameMapper: {              
    '^(\\.{1,2}/.*)\\.js$': '$1',   
  },  
};

export default config;
