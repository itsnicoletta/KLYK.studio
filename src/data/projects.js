
//progetto 1 assets
import cover1 from './projectsAssets/project1_cover.webp'
import img1_1 from './projectsAssets/project1_1.webp'
import img1_2 from './projectsAssets/project1_2.webp'
import img1_3 from './projectsAssets/project1_3.webp'
import vid1 from './projectsAssets/project1_video.webm'

//progetto 2 assets
import cover2 from './projectsAssets/project2_cover.webp'
import img2_1 from './projectsAssets/project2_1.webp'
import img2_2 from './projectsAssets/project2_2.webp'
import img2_3 from './projectsAssets/project2_3.webp'
import vid2 from './projectsAssets/project2_video.webm'


//progetto 3 assets
import cover3 from './projectsAssets/project3_cover.webp'
import img3_1 from './projectsAssets/project3_1.webp'
import img3_2 from './projectsAssets/project3_2.webp'
import img3_3 from './projectsAssets/project3_3.webp'
import vid3 from './projectsAssets/project3_video.webm'

//progetto 4 assets

//progetto 5 assets
import cover5 from './projectsAssets/project5_cover.webp'
import img5_1 from './projectsAssets/project5_1.webp'
import img5_2 from './projectsAssets/project5_2.webp'
import img5_3 from './projectsAssets/project5_3.webp'




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
/*      {
        id: 4,
        slug: 'photography-portfolio-website-ui-design',
        title: 'Photography Portfolio Website',
        H2: 'A sleek and modern portfolio website design for a professional photographer, showcasing their work and services.',
        shortDescription:
            'A clean, visually-driven website concept that highlights photography through holographic elements, colors and lighting to reflect the artist\'s unique style.',
        description: `This project involved designing a portfolio website for a professional photographer, focusing on creating a visually appealing and user-friendly interface. The design emphasizes large, high-quality images to showcase the photographer's work, with a layout that balances aesthetics and functionality. Key features include a gallery section, an about page, and a contact form, all designed to enhance user engagement and facilitate easy navigation.`,
        secondDescription: `The design incorporates modern web design trends, such as minimalism and responsive layouts, ensuring that the website looks great on all devices. The use of holographic elements and strategic lighting effects adds a unique touch that reflects the photographer's artistic vision. Overall, the portfolio website aims to provide an immersive experience that effectively represents the photographer's brand and attracts potential clients.`,
        skills: [
            'UI Design',
            'Web Design',
            'Responsive Design',
            'Branding'
        ],
        coverImage: 'path/to/cover4.png',
        galleryImages: [
             'path/to/image4_1.png',
            'path/to/image4_2.png',
            'path/to/image4_3.png' 
       
        year: '2026',
     */
    {
        id: 5,
        slug: 'brand-identity-design-for-fire-starter-company',
        title: 'Focum - Brand Identity Design',
        H2: 'Art direction and brand identity design for Focum, a company specializing in fire-starting products.',
        shortDescription:
            'A bold, elegant and dynamic brand identity that captures the essence of fire and ignition, combining strong visuals with strategic messaging to position Focum as a leader in its market.',
        description: `Focum was a comprehensive brand identity project that involved creating a cohesive visual and verbal language for a fire-starting products company. The design process included logo creation, color palette selection, typography, photography, and the development of marketing materials that reflect the brand's core values of strength, reliability, and innovation.`,
        secondDescription: `the brand identity was crafted to resonate with a more posh target audience, using sophisticated design elements and a refined aesthetic. The visual identity incorporates fiery colors and dynamic shapes to evoke the energy and power of fire, while the messaging emphasizes the brand's commitment to quality and performance. The result is a compelling brand presence that effectively communicates Focum's unique value proposition in the competitive market of fire-starting products as a product for parties and glamping.`,
        skills: [
            'Brand Identity',
            'Art Direction',
            'Graphic Design',
        ],
        coverImage: cover5,
        galleryImages: [
            img5_1,
            img5_2,
            img5_3
        ],
        link: 'https://drive.google.com/file/d/1O0llKcTZq1OYRsD8eUrEFnUhW5pr-VG2/view?ths=true',
        year: '2024'    
    },
    {
        id: 6,
        slug: 'museum-website-redesign-ui-ux',
        title: 'Museum Website Redesign',
        H2: 'A complete redesign of a museum website to enhance user experience and engagement.',
    }

];

