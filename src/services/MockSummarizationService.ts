import { ISummarizationService } from '@/types';

export class MockSummarizationService implements ISummarizationService {
  private mockSummaries = {
    'mock-episode-1': `This episode explores the cutting-edge developments in artificial intelligence and their transformative impact on technology. Key topics covered include:

• Machine Learning Advancements: Discussion of recent breakthroughs in neural networks and deep learning algorithms
• AI Applications: Real-world implementations across various industries including healthcare, finance, and autonomous systems
• Ethical Considerations: Important conversations about AI bias, transparency, and responsible development
• Future Predictions: Expert insights on where AI technology is heading in the next 5-10 years

The episode emphasizes how AI is becoming increasingly integrated into everyday technology, from smart assistants to predictive analytics systems. Experts highlight both the opportunities and challenges presented by rapid AI advancement.`,

    'mock-episode-2': `This comprehensive discussion covers essential web development best practices for 2024. The episode highlights:

• Modern Framework Selection: Evaluation of React, Vue, Angular, and emerging frameworks
• Performance Optimization: Techniques for improving Core Web Vitals and user experience
• Security Best Practices: Implementation of HTTPS, input validation, and protection against common vulnerabilities
• Responsive Design: Mobile-first approaches and cross-browser compatibility
• Code Quality: Testing strategies, code reviews, and maintainable architecture patterns

The hosts emphasize the importance of staying current with industry standards while building scalable, secure, and performant web applications.`,

    'mock-episode-3': `This episode provides a deep dive into current cloud computing trends and strategic implementation approaches:

• Multi-Cloud Strategies: Benefits and challenges of using multiple cloud providers
• Serverless Architecture: Cost optimization and scalability advantages
• Edge Computing: Reducing latency and improving user experience
• Cost Management: Tools and techniques for monitoring and optimizing cloud spending
• Security and Compliance: Best practices for protecting data in cloud environments

The discussion includes practical advice for businesses looking to optimize their cloud infrastructure while maintaining security and performance standards.`,

    'mock-episode-4': `This critical episode addresses cybersecurity challenges in today's digital landscape:

• Threat Landscape: Analysis of current cyber threats including ransomware, phishing, and state-sponsored attacks
• Zero-Trust Architecture: Implementation strategies for enhanced security
• Threat Intelligence: Leveraging data to predict and prevent attacks
• Incident Response: Best practices for handling security breaches
• Compliance and Regulations: Navigating cybersecurity requirements across industries

The episode emphasizes the importance of proactive security measures and continuous monitoring in protecting digital assets.`,

    'mock-episode-5': `This episode explores the transformative power of data science in modern business:

• Predictive Analytics: How machine learning is revolutionizing business intelligence
• Data-Driven Decision Making: Frameworks for incorporating analytics into strategic planning
• Big Data Technologies: Tools and platforms for processing large datasets
• Industry Applications: Real-world examples from healthcare, finance, and retail
• Skills Development: Essential competencies for data science professionals

The discussion highlights how organizations can leverage data science to gain competitive advantages and improve operational efficiency.`
  };

  async summarizeContent(content: string): Promise<string> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extract episode title from content to determine which mock summary to return
    const titleMatch = content.match(/Title: (.+)/);
    if (titleMatch) {
      const title = titleMatch[1];
      
      // Find matching episode and return its mock summary
      for (const [episodeId, summary] of Object.entries(this.mockSummaries)) {
        if (title.includes('AI') && episodeId === 'mock-episode-1') return summary;
        if (title.includes('Web Development') && episodeId === 'mock-episode-2') return summary;
        if (title.includes('Cloud Computing') && episodeId === 'mock-episode-3') return summary;
        if (title.includes('Cybersecurity') && episodeId === 'mock-episode-4') return summary;
        if (title.includes('Data Science') && episodeId === 'mock-episode-5') return summary;
      }
    }
    
    // Default summary if no match found
    return `This episode provides valuable insights into the topic discussed. The content covers important aspects and offers practical takeaways for listeners interested in this subject matter. The discussion is well-structured and provides both theoretical knowledge and practical applications.`;
  }
} 