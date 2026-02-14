// 3-Category Structure for The Forge
export const forgeCategories = [
  {
    id: 'forge',
    name: 'Forge',
    tagline: 'We Build',
    description: 'Custom digital products engineered for performance',
    services: [
      {
        id: 'saas',
        title: 'SaaS Applications',
        desc: 'Scalable software platforms built from the ground up',
        longDesc: 'We engineer Software-as-a-Service platforms designed to scale with your ambitions. From MVP to enterprise-ready.',
        tools: ['React', 'Node.js', 'PostgreSQL', 'AWS']
      },

      {
        id: 'landing',
        title: 'Landing Pages',
        desc: 'High-converting web pages that capture leads',
        longDesc: 'Conversion-optimized landing pages designed to turn visitors into customers.',
        tools: ['Next.js', 'Tailwind', 'Framer Motion']
      },
      {
        id: 'management',
        title: 'Management Systems',
        desc: 'Business workflow and productivity apps',
        longDesc: 'Custom internal tools and management dashboards that streamline your operations.',
        tools: ['React', 'Node.js', 'MongoDB', 'Redis']
      },
      {
        id: 'iot',
        title: 'IoT Products',
        desc: 'Connected device solutions',
        longDesc: 'End-to-end IoT product development from hardware integration to cloud dashboards.',
        tools: ['Arduino', 'Raspberry Pi', 'MQTT', 'AWS IoT']
      }
    ]
  },
  {
    id: 'craft',
    name: 'Craft',
    tagline: 'We Design',
    description: 'Visual experiences that captivate and convert',
    services: [
      {
        id: 'uiux',
        title: 'UI/UX Redesign',
        desc: 'Interface transformation for better conversions',
        longDesc: 'Complete user experience overhauls grounded in research and modern design principles.',
        tools: ['Figma', 'Adobe XD', 'Framer', 'Spline']
      },
      {
        id: 'templates',
        title: 'Templates',
        desc: 'Ready-to-use professional designs',
        longDesc: 'Custom templates for websites, presentations, and marketing materials.',
        tools: ['Figma', 'Canva', 'Notion']
      },
      {
        id: 'catalogs',
        title: 'Brand Catalogs',
        desc: 'Print & digital product catalogs',
        longDesc: 'Beautiful product catalogs that showcase your offerings in the best light.',
        tools: ['InDesign', 'Illustrator', 'Figma']
      },
      {
        id: 'creatives',
        title: 'WhatsApp Creatives',
        desc: 'Marketing visuals for messaging',
        longDesc: 'Eye-catching graphics optimized for WhatsApp and social sharing.',
        tools: ['Photoshop', 'Canva', 'Figma']
      }
    ]
  },
  {
    id: 'amplify',
    name: 'Amplify',
    tagline: 'We Market',
    description: 'Strategies that grow your reach and revenue',
    services: [
      {
        id: 'email',
        title: 'Email Campaigns',
        desc: 'Automated email marketing that converts',
        longDesc: 'Data-driven email sequences that nurture leads and drive sales.',
        tools: ['Mailchimp', 'HubSpot', 'Klaviyo']
      },
      {
        id: 'social',
        title: 'Social Media',
        desc: 'Full social presence management',
        longDesc: 'Content creation, scheduling, and engagement across all major platforms.',
        tools: ['Meta Business', 'Buffer', 'Canva']
      },
      {
        id: 'seo',
        title: 'SEO Optimization',
        desc: 'Search visibility that drives traffic',
        longDesc: 'Technical SEO, content strategy, and link building for organic growth.',
        tools: ['SEMrush', 'Ahrefs', 'Google Search Console']
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp Campaigns',
        desc: 'Direct messaging that reaches customers',
        longDesc: 'Broadcast campaigns and automated responses for WhatsApp Business.',
        tools: ['WhatsApp Business API', 'Twilio']
      }
    ]
  }
];
