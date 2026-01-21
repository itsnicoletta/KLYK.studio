
//progetto 1 assets
import cover1 from './projectsAssets/project1_cover.png'
import img1_1 from './projectsAssets/project1_1.png'
import img1_2 from './projectsAssets/project1_2.png'
import img1_3 from './projectsAssets/project1_3.png'
import vid1 from './projectsAssets/project1_video.mp4'

//progetto 2 assets
import cover2 from './projectsAssets/project2_cover.png'
import img2_1 from './projectsAssets/project2_1.png'
import img2_2 from './projectsAssets/project2_2.png'
import img2_3 from './projectsAssets/project2_3.png'
import vid2 from './projectsAssets/project2_video.mp4'


//progetto 3 assets
import cover3 from './projectsAssets/project3_cover.png'
import img3_1 from './projectsAssets/project3_1.png'
import img3_2 from './projectsAssets/project3_2.png'
import img3_3 from './projectsAssets/project3_3.png'
import vid3 from './projectsAssets/project3_video.mp4'




export const projects = [
    {
        id: 1,
        slug: 'lost-in-light-immersive-experience',
        title: 'Lost in Light',
        H2: 'An interactive and immersive web-based experience exploring light and perception.',
        year: '2025',
        shortDescription:
            'A narrative-driven digital experience that blends motion, sound, and interactivity to explore the relationship between humans and light.',
        description: `Lost in Light is an experimental web project that invites users to explore the boundaries between light and darkness through motion, sound, and interaction. 
    The experience was designed to evoke emotion and curiosity, using WebGL and storytelling techniques to guide the user through an immersive journey. 
    Every scene reacts dynamically to the user's movements, creating a sense of flow and discovery.`,
        secondDescription: `The project was built using Spline for 3D modeling and Vue.js for the web framework, ensuring a smooth and engaging user experience.
    The sound design plays a crucial role in enhancing the atmosphere, with ambient sounds that evolve as users navigate through different environments.
    Lost in Light aims to challenge traditional web experiences by merging art, technology, and storytelling into a cohesive and captivating journey.`,
        skills: ['spline', 'Vue.js', 'UX/UI Design', 'Motion Design'],
        coverImage: cover1,
        galleryImages: [
            img1_1,
            img1_2,
            img1_3
        ],
        video: vid1,
        link: 'https://lostinlight.netlify.app/'
    },
    {
        id: 2,
        slug: 'polaroid-webflow-interactive-gallery',
        title: 'Polaroid landing page',
        H2: 'A Polaroid-style web gallery built in Webflow with playful micro-interactions.',
        shortDescription:
            'A nostalgic photo-wall concept that turns images into tactile Polaroid cards, inviting exploration through hover and click.',
        description: 'Polaroid landing page is a Webflow project focused on translating the feeling of physical photo prints into a digital experience. The layout recreates a scattered Polaroid wall, balancing hierarchy, whitespace, and a modular grid to keep the navigation clear while preserving a “handmade” look.',       
        secondDescription: 'The build leverages Webflow’s component-based structure and interactions to deliver smooth motion and responsive behavior. Cards react to user input with subtle tilt / scale and depth cues, reinforcing the physical metaphor while keeping performance and accessibility in mind.',
        skills: ['Webflow', 'UI Design', 'Micro-interactions', 'Responsive Design'],
        coverImage: cover2,
        galleryImages: [
            img2_1,
            img2_2,
            img2_3
        ],
        video: vid2,
        link: 'https://progetto-esame---pelosi-nicoletta.webflow.io/',
        year: '2025'
    },
    {
        id: 3,
        slug: 'focusflow-vue-tailwind-firebase-app',
        title: 'FocusFlow pro',
        H2: 'A productivity web app built with Vue, Tailwind and Firebase, designed to support focus sessions and habit consistency.',
        shortDescription: 'goals, notes and a personal dashboard with streaks—combined in a clean, login-gated experience with Google authentication.',
        description: `FocusFlow pro is a productivity web application designed to help users maintain focus and build consistent habits. The app features a clean, user-friendly interface built with Vue.js and styled using Tailwind CSS. It offers functionalities such as focus sessions, goal tracking, and note-taking, all integrated into a personal dashboard that highlights user streaks and progress.`,
        secondDescription: `The application leverages Firebase for backend services, including user authentication via Google sign-in and real-time data storage. FocusFlow pro aims to provide a seamless experience that encourages users to stay on track with their productivity goals through intuitive design and reliable performance.`,
        skills: ['Vue.js', 'Tailwind CSS', 'Firebase', 'UI/UX Design'],
        coverImage: cover3,
        galleryImages: [img3_1, img3_2, img3_3],
        video: vid3,
        link: 'https://focusflowpro.netlify.app',
        year: '2024'
    },
     {
        id: 4,
        slug: 'fintech-aml-kyc-unified-operations-case-study',
        title: 'Unified KYC/AML Workspace',
        H2: 'A concept case study for standardizing KYC/AML operations across fragmented fintech tooling.',
        shortDescription:
            'A unified operations workspace designed to reduce onboarding time, streamline compliance workflows, and improve consistency across teams and vendors.',
        description: `Unified KYC/AML Workspace is a fintech product concept born from a recurring industry pain point: compliance teams often operate across multiple disjointed systems, each with different logic, terminology, and workflows. This fragmentation increases operational risk, slows down investigations, and forces every analyst to relearn the process when switching companies—often costing months of ramp-up time.`,
        secondDescription: `The project explores a standardized, role-based workflow for KYC onboarding and AML monitoring, focusing on clarity, auditability, and handoff efficiency. The experience is designed around a single investigation hub: consistent case views, reusable decision patterns, clear evidence trails, and structured outputs that support audit reviews. The goal is to reduce cognitive load, accelerate decision-making, and create a more uniform operational model that can adapt to different providers while keeping the user experience stable.`,
        skills: [
            'Product Design',
            'UX Research',
            'Information Architecture',
            'Workflow Design',
            'Compliance UX (KYC/AML)',
            'Prototyping'
        ],
        year: '2026',
    },
    {
        id: 5,
        slug: 'template-project-5',
        title: 'Project Title 5',
        H2: 'Subtitle for project 5.',
        shortDescription:
            'A brief description of project 5.',
        description: `Detailed description of project 5.`,
        secondDescription: `Additional information about project 5.`,
        skills: ['Skill 1', 'Skill 2', 'Skill 3'],
        coverImage: 'path/to/cover5.png',
        galleryImages: [
            'path/to/image5_1.png',
            'path/to/image5_2.png',

            'path/to/image5_3.png'
        ],
        video: 'path/to/video5.mp4',
        link: 'https://link-to-project-5.com',
        year: '2023'    
    } 

];

