import services1 from '../data/servicesAssets/services1.png';
import services2 from '../data/servicesAssets/services2.png';
import services3 from '../data/servicesAssets/services3.png';


export const services = [
    {
        id: 1,
        slug: 'ux-research-prototyping',
        title: 'UX Research & Prototyping',
        subtitle: 'Understanding user needs to create intuitive designs.',
        description: 'We conduct thorough user research to gather insights and inform design decisions. Our prototyping process allows us to test and refine concepts, ensuring a user-centered approach that enhances usability and engagement.',
        bullets: [
            'User Interviews & Surveys',
            'Workflow Analysis & User Journeys',
            'Wireframing & Interactive Prototypes',
        ],
        client: 'For startups and established businesses looking to improve user experience and engagement through research-driven design.',
        Cta: 'Need to understand your users?',
        image: services1,
    },
    {
        id: 2,
        slug: 'landing-pages-3d-web-experiences',
        title: 'Landing Pages & 3D Experiences',
        subtitle: 'Crafting visually stunning and interactive web experiences that converts and engage users.',   
        description: 'We specialize in creating immersive landing pages and 3D web experiences that captivate audiences. By integrating cutting-edge technologies and design principles, we deliver engaging digital environments that leave a lasting impression.',
        bullets: [
            'Custom 3D Modeling & Animation',
            'Interactive WebGL Experiences',
            'Responsive & Performance-Optimized Design',
        ], 
        client: 'For businesses seeking to create impactful online presences with advanced visual and interactive elements.',
        Cta: 'Want to amaze your audience?',
        image: services2,
    },
    {
        id: 3,
        slug: 'frontend-development-webflow',
        title: 'Frontend Development & Webflow',
        subtitle: 'Building responsive and dynamic websites with modern frontend technologies.',
        description: 'Our frontend development services focus on creating responsive, fast, and user-friendly websites. We utilize vue.js and tailwind plus backend options for the client to manage the site in autonomy and we use modern frameworks and tools, including Webflow, to deliver high-quality web solutions that meet the unique needs of our clients.',
        bullets: [  
            'Custom Website Development',
            'Webflow Design & Implementation',
            'Performance Optimization & SEO Best Practices',
        ],
        client: 'For businesses and individuals looking to establish or enhance their online presence with professional web development services.',
        Cta: 'Need a new website?',
        image: services3,
    },
];

export const otherServices = [
    {
        id: 1,
        slug: 'brand-identity-graphic-design',
        title: 'Brand Identity & Graphic Design',  
        subtitle: 'Creating visually cohesive brand identities that resonate with your audience.',
        description: 'We create cohesive brand identities and graphic designs that effectively communicate your brand’s message and values through visual storytelling and archetypes. From logos to marketing materials, we ensure consistency across all visual elements.',
        bullets: [
            'Logo Design & Brand Guidelines',
            'Marketing Collateral & Print Design',
            'Social Media Graphics & Digital Assets',
        ],
        client: 'For businesses and individuals seeking to establish or refresh their brand identity through professional graphic design services.',
        Cta: 'Looking to build your brand?',
    },
    {
        id: 2,
        slug: 'digital-project-consultation-and-support-in-development',
        title: 'Have an Idea? Let\'s Talk!',
        subtitle: 'We\'re here to help bring your digital projects to life.',
        description: 'Whether you have a clear vision or just a spark of an idea, we\'d love to hear from you. Our team is ready to collaborate and provide expert guidance to turn your concepts into reality. Let\'s discuss how we can work together to create something amazing.',
        bullets: [
            'Project Consultation & Ideation',
            'Custom Solutions Tailored to Your Needs',
            'Ongoing Support & Collaboration',
        ],
        client: 'For anyone with a digital project idea looking for professional support and collaboration to bring it to life.',
        Cta: 'Get in touch today!',
    },
];