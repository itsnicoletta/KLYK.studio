
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
/* import cover4 from './projectsAssets/project4_cover.webp'
import img4_1 from './projectsAssets/project4_1.webp'
import img4_2 from './projectsAssets/project4_2.webp'
import img4_3 from './projectsAssets/project4_3.webp' */

//progetto 5 assets
import cover5 from './projectsAssets/project5_cover.webp'
import img5_1 from './projectsAssets/project5_1.webp'
import img5_2 from './projectsAssets/project5_2.webp'
import img5_3 from './projectsAssets/project5_3.webp'

//progetto 6 assets
import cover6 from './projectsAssets/project6_cover.webp'
import img6_1 from './projectsAssets/project6_1.webp'
import img6_2 from './projectsAssets/project6_2.webp'
import img6_3 from './projectsAssets/project6_3.webp'
import vid6 from './projectsAssets/project6_video.webm'

//progetto 7 assets
import cover7 from './projectsAssets/project7_cover.webp'
import img7_1 from './projectsAssets/project7_1.webp'
import img7_2 from './projectsAssets/project7_2.webp'
import img7_3 from './projectsAssets/project7_3.webp'   
import vid7 from './projectsAssets/project7_video.webm'

//progetto 8 assets
import cover8 from './projectsAssets/project8_cover.webp'
import img8_1 from './projectsAssets/project8_1.webp'
import img8_2 from './projectsAssets/project8_2.webp'
import img8_3 from './projectsAssets/project8_3.webp'
import img8_4 from './projectsAssets/project8_4.webp'
import vid8 from './projectsAssets/project8_video.webm'

//progetto 9 assets
import cover9 from './projectsAssets/project9_cover.webp'
import img9_1 from './projectsAssets/project9_1.webp'
import img9_2 from './projectsAssets/project9_2.webp'
import img9_3 from './projectsAssets/project9_3.webp'

//progetto 10 assets
import cover10 from './projectsAssets/project10_cover.webp'
import img10_1 from './projectsAssets/project10_1.webp'
import img10_2 from './projectsAssets/project10_2.webp'
import img10_3 from './projectsAssets/project10_3.webp'
import vid10 from './projectsAssets/project10_video.webm'




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
        shortDescription: 'goals, notes and a personal dashboard with streaks, combined in a clean, login-gated experience with Google authentication.',
        description: `FocusFlow pro is a productivity web application designed to help users maintain focus and build consistent habits. The app features a clean, user-friendly interface built with Vue.js and styled using Tailwind CSS. It offers functionalities such as focus sessions, goal tracking, and note-taking, all integrated into a personal dashboard that highlights user streaks and progress.`,
        secondDescription: `The application leverages Firebase for backend services, including user authentication via Google sign-in and real-time data storage. FocusFlow pro aims to provide a seamless experience that encourages users to stay on track with their productivity goals through intuitive design and reliable performance.`,
        skills: ['Vue.js', 'Tailwind CSS', 'Firebase', 'UI/UX Design'],
        coverImage: cover3,
        galleryImages: [img3_1, img3_2, img3_3],
        video: vid3,
        link: 'https://focusflowpro.netlify.app',
        year: '2025'
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
        slug: 'a-tavola-editorial-ui',
        title: 'A Tavola - Editorial UI Concept',
        H2: 'A bento-style magazine UI designed for busy food professionals who want fast, low-fatigue reading.',
        year: '2025',
        shortDescription:
            'A 3-page editorial UI concept that replaces the “classic blog” look with an airy, friendly magazine layout built for quick scanning and short-form reading.',
        description: `A Tavola is a cooking magazine UI concept created to make culinary content more pleasant to read than a traditional blog, especially for professionals with limited time.
The interface prioritizes visual comfort and fast comprehension through generous spacing, clear typographic hierarchy, and modular bento-style cards that support scanning.
Short reading blocks, concise previews, and lightweight sections help users get value quickly without feeling overwhelmed.`,
        secondDescription: `The project includes three key pages designed as a cohesive editorial system: a dynamic homepage for discovery, a structured section layout to browse themes, and a content-focused reading experience built around clarity and rhythm.
The visual language is youthful and friendly, balancing personality with readability through rounded components, soft contrasts, and an approachable tone.
This work focuses specifically on UI design-composition, layout logic, and an editorial component set that can scale consistently across the magazine.`,
        skills: ['UI Design', 'Editorial Design', 'Responsive Design', 'Visual Hierarchy', 'Design System', 'Figma'],
        coverImage: cover6,
        galleryImages: [img6_1, img6_2, img6_3],
        video: vid6,
        link: 'https://www.figma.com/proto/x6o06MqvUwOKcPRwxLzKNI/cooking-magazine-ui?page-id=0%3A1&node-id=1-4965&p=f&viewport=836%2C134%2C0.22&t=konD1mBlxS2zlN5k-1&scaling=min-zoom&content-scaling=fixed'
    },
    {
        id: 7,
        slug: 'remarkable-seamless-configurator',
        title: 'reMarkable - Seamless Product Configurator',
        H2: 'A guided selection flow that reduces choice overload and increases checkout confidence.',
        year: '2024',
        shortDescription:
            'UI concept for a step-by-step configurator (Marker → Folio → Review) with a persistent summary to keep users oriented and conversion-ready.',
        description: `This project explores a conversion-oriented configurator UI for reMarkable, designed to help customers choose the right setup with minimal friction.
The experience breaks down decisions into focused steps, first selecting a Marker, then a Folio, while keeping a persistent order Summary visible at all times.
By limiting options per screen and showing immediate price updates, the flow reduces cognitive load and supports faster, more confident decisions.`,
        secondDescription: `Multiple layout variations were designed to optimize hierarchy and momentum: product imagery stays central to create clarity, while CTAs remain consistent (Next/Previous) to preserve navigation predictability.
The visual language is intentionally minimal and “quiet” to match the brand’s premium tone, while micro-interactions and progressive disclosure guide attention without adding noise.
Overall, the UI aims to make product selection feel seamless, trustworthy, and conversion-focused from the first choice to the final review.`,
        skills: ['UI Design', 'Conversion Design', 'Interaction Design', 'Micro-interactions', 'Visual Hierarchy', 'Prototyping', 'Figma'],
        coverImage: cover7,
        galleryImages: [img7_1, img7_2, img7_3],
        video: vid7,
        link: 'https://www.figma.com/proto/bojibpNC5mx5s0889jVYhf/Remarkable-conversion-Ux?page-id=0%3A1&node-id=1-7943&p=f&viewport=646%2C482%2C0.17&t=egUkiEHEWRNFYejz-1&scaling=min-zoom&content-scaling=fixed'
    },
    {
        id: 8,
        slug: 'paper-museum-responsive-ui-prototype',
        title: 'Museo della Carta - Responsive Museum Website UI',
        H2: 'A future-inspired, minimal museum website prototype designed for clarity, space, and modern cultural storytelling.',
        year: '2023',
        shortDescription:
            'Complete UI style exploration and clickable prototype (desktop + mobile) for Museo della Carta, inspired by the Museum of the Future in Dubai and built around a clean, spacious, editorial layout.',
        description: `Created in 2023 during my transition from Communication to Digital Design, this project focuses on building a contemporary web identity for Museo della Carta.
Inspired by the Museum of the Future in Dubai, I designed a fresh and minimal UI system that prioritizes generous whitespace, calm typography, and clear hierarchy to keep the experience lightweight and easy to read.
The deliverable is a fully clickable, responsive prototype covering both desktop and mobile.`,
        secondDescription: `The prototype includes key informational and editorial sections to support exploration and planning:
Home, La Fondazione, Museo della Carta, Mostre, Valle delle Cartiere, Blog, and Contatti.
I structured the navigation to be simple and predictable, using consistent components and modular sections for content such as events and exhibitions.
Overall, the project demonstrates a clean visual direction and a scalable UI foundation for a modern museum website.`,
        skills: ['UI Design', 'Responsive Design', 'Visual Direction', 'Information Architecture', 'Prototyping', 'Figma'],
        coverImage: cover8,
        galleryImages: [img8_1, img8_2, img8_3, img8_4],
        video: vid8,
        link: 'https://www.figma.com/proto/kXT51XAlJOnJQNH9rULNLL/Futuristic-museum-ui?page-id=3%3A2&node-id=153-585&p=f&viewport=484%2C287%2C0.1&t=ya6VfiqZS0f6vd3T-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=153%3A585&show-proto-sidebar=1'
    },
    {
        id: 9,
        slug: 'jewellery-newsletter-design',
        title: 'Jewellery Brand - Promotional Newsletter Design',
        H2: 'A conversion-focused email layout designed to work within real email-client constraints.',
        year: '2024',
        shortDescription:
            'Single-page promotional newsletter concept for a jewellery brand, structured for clarity and compatibility across email readers with strict layout and image limitations.',
        description: `This project is a promotional newsletter design created in 2024 for a jewellery brand campaign (Black Friday / Holiday gifting).
Unlike standard web UI, email design comes with strict constraints: inconsistent support across clients, limited CSS, heavy reliance on images, and tight rendering rules.
The goal was to craft a clean, readable layout that keeps the hierarchy clear and the CTAs strong while staying compatible with common email readers.`,
        secondDescription: `The newsletter follows a simple conversion path: a strong hero with a primary CTA, a product grid with discounts and “Buy” actions, followed by secondary offer blocks and collection shortcuts.
Spacing and typography were kept conservative to reduce rendering risk, while the modular structure allows sections to be reused or rearranged for future campaigns.
This work focuses specifically on a single email page layout, balancing brand tone with deliverability and cross-client reliability.`,
        skills: ['Email Design', 'Visual Hierarchy', 'Conversion Design', 'Layout Design', 'Brand Consistency'],
        coverImage: cover9,
        galleryImages: [img9_1, img9_2, img9_3],
        link: 'https://www.figma.com/proto/qedKg0I5m5aPMVs1qj7O86/Jewels-newsletter?page-id=0%3A1&node-id=1-2&p=f&viewport=805%2C81%2C0.67&t=dk0IBWbkBWDoYa0r-1&scaling=min-zoom&content-scaling=fixed'
    },
    {
        id: 10,
        slug: 'know-education-activities-platform',
        title: 'KNOW - Educational Activities Platform',
        H2: 'A usability-first dashboard that helps schools plan workshops and challenges while keeping teachers in control.',
        year: '2023',
        shortDescription:
            'UX/UI concept for an education platform that simplifies how teachers discover, organize, and track educational projects for middle and high school students, plus a gamified challenge layer with end-of-year rewards.',
        description: `KNOW is a 2023 UX/UI project designed to solve a practical school problem: making it easier for teachers to find and manage educational activities (workshops, projects, and experiences) suitable for middle and high school students.
The core experience is an admin-style dashboard that supports planning and coordination, surfacing schedules, stats, rankings, and project management in a clear, low-friction interface.
The design prioritizes usability, predictable patterns, and fast navigation so teachers can operate efficiently even with limited time.`,
        secondDescription: `The platform includes a complete management flow: projects overview, project details, creation steps (multi-step form), notifications, profile/settings, feedback collection, and archive/bin management.
To support student engagement, the system introduces challenges and point-based progress logic, aiming to motivate participation through a final end-of-year prize.
Overall, KNOW balances two needs: an efficient administrative tool for educators and a structured framework to make learning activities feel motivating and trackable for students.`,
        skills: ['UX Design', 'UI Design', 'Dashboard Design', 'Information Architecture', 'Usability', 'Interaction Design', 'Prototyping', 'Figma'],
        coverImage: cover10,
        galleryImages: [img10_1, img10_2, img10_3],
        video: vid10,
        link: 'https://www.figma.com/proto/R1u7eFpImTG9Aqtx79rDDT/k-now---webapp-prototype-for-schools-and-green-education?page-id=0%3A1&node-id=1-498&p=f&viewport=149%2C-1759%2C0.34&t=f4yAFmhcbPCFyxxv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A1212'
    }
];
