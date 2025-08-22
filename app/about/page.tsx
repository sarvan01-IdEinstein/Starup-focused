'use client'

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import MotionWrapper from '@/components/shared/MotionWrapper';
import TeamSection from '@/components/about/TeamSection';
import TimelineSection from '@/components/about/TimelineSection';
import { TeamMember, TimelineEvent } from '@/lib/types';

const stats = [
  { label: 'Years of Global Engineering Experience', value: '26+' },
  { label: 'Years at Mann + Hummel (2011-2025)', value: '14' },
  { label: 'Major Projects Led & Delivered', value: '50+' },
  { label: 'Patents Pending & Innovations', value: '2+' }
];

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Saravanakumar',
    position: 'Founder & Chief Engineering Officer',
    image: '/images/team/saravanakumar.jpg',
    bio: 'R&D Project Manager with 23+ years of global engineering experience. Specialized in modular design, filtration systems, and automation. Currently leading innovation projects at Mann + Hummel in Germany while building the bridge between German precision and Indian manufacturing excellence.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    expertise: [
      'Modular Design & Manufacturing',
      'Filtration & Fluid Systems',
      'Automation & Process Optimization',
      'Cross-Cultural Project Management',
      'CAD/CAM (SolidWorks, AutoCAD, Creo)',
      'R&D Innovation & Patents'
    ],
    achievements: [
      '30% cost reduction on modular designs',
      '€100k savings through automation solutions',
      'Two patents in filtration technology',
      '13+ years bridging German-Indian engineering'
    ]
  }
];

const timeline: TimelineEvent[] = [
  {
    year: '1998',
    title: 'Engineering Foundation',
    description: 'Diploma in Mechanical Engineering - Coimbatore Institute of Technology'
  },
  {
    year: '2001',
    title: 'Career Launch',
    description: 'Service & Design Engineer - 6 years in vendor development & manufacturing'
  },
  {
    year: '2007',
    title: 'Singapore Chapter',
    description: 'Bachelor\'s degree + Automation Design - Global perspective gained'
  },
  {
    year: '2011',
    title: 'Mann + Hummel Singapore',
    description: 'R&D Engineer - UF module development & filtration technology'
  },
  {
    year: '2016',
    title: 'Germany Leadership',
    description: 'R&D Project Manager - Leading modular design & MBR innovations'
  },
  {
    year: '2025',
    title: 'IdEinstein Founded',
    description: 'Bridging German precision with global manufacturing excellence'
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern & Impactful */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-yellow-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              The Bridge Between
              <br />
              <span className="text-yellow-400">German Precision</span>
              <br />
              & <span className="text-blue-400">Indian Innovation</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              26+ years of global engineering experience.<br />
              From automation design to advanced filtration systems.<br />
              One vision: Seamless cross-continental collaboration.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button variant="cta" size="lg">
                Discover My Journey
              </Button>
              <Button variant="outline" size="lg">
                View Expertise
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ height: ["0%", "30%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 bg-white/70 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Enhanced Visual Design */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-yellow-50 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-slate-800">Experience That Speaks</h2>
            <p className="text-xl text-slate-600">Numbers that tell the story of global engineering excellence</p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 h-32 flex flex-col justify-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100 font-medium text-sm leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey - Interactive Story */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
              From <span className="text-orange-600">India</span> to <span className="text-green-600">Singapore</span> to <span className="text-blue-600">Germany</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A journey of discovery, learning, and building bridges across continents
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="md:flex">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 p-8 flex flex-col items-center justify-center text-white"
                >
                  <div className="w-32 h-32 rounded-full bg-white/20 mb-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/images/team/saravanakumar.jpg" 
                      alt="Saravanakumar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-bold" style={{display: 'none'}}>
                      SV
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Saravanakumar</h3>
                  <p className="text-blue-100 text-center text-sm">Founder & Chief Engineering Officer</p>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold">26+</div>
                    <div className="text-blue-200 text-sm">Years Experience</div>
                  </div>
                </motion.div>

                {/* Story Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="md:w-2/3 p-8"
                >
                  <h3 className="text-2xl font-bold mb-6 text-slate-800">The Journey Behind IdEinstein</h3>
                  <div className="space-y-4 text-slate-600 leading-relaxed">
                    <p>
                      Our story isn't just about engineering; it's about a journey that spans continents and decades, culminating in a solution to a problem I witnessed firsthand. I began my career in October 2001 as a service and design engineer in India, where I spent six years immersed in the intricacies of vendor development and on-the-ground engineering.
                    </p>
                    <p>
                      This experience gave me a deep appreciation for the manufacturing ecosystem and the challenges of delivering quality at scale. My path then led me to Singapore, where I pursued my bachelor's degree while continuing to work, broadening my perspective on global business and technology.
                    </p>
                    <p>
                      My company then offered me the opportunity to move to Germany, where I spent the next ten years. It was here, at the heart of European engineering excellence, that I identified a critical gap. I saw German companies hesitate to leverage the immense potential of Indian manufacturing, not due to a lack of skill, but because of communication barriers, cultural differences, and a general unfamiliarity with the landscape.
                    </p>
                    <p>
                      After over two decades in the industry, and ten years with the same company, I realized I was uniquely positioned to bridge this gap. I had the language, the cultural understanding, and the technical expertise to connect these two worlds.
                    </p>
                    <p className="font-medium text-slate-700">
                      So, at 42, I made the decision to leave my stable career and embark on a new venture: IdEinstein. IdEinstein was born from the conviction that great engineering knows no borders. We are the bridge that connects German precision with Indian ingenuity, a single point of contact that eliminates the friction and uncertainty of global collaboration. We are not just a service provider; we are a partner, a guide, and a testament to the power of experience in solving real-world problems.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Timeline */}
      <TimelineSection events={timeline} />

      {/* Expertise Showcase */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Technical Excellence</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Bridging advanced engineering with practical manufacturing solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: 'Automated Machine Design',
                description: 'Scalable automation solutions with proven €100k+ cost savings',
                icon: '🤖',
                skills: ['Assembly Line Automation', 'Equipment Design', 'Process Optimization', 'Cost Reduction']
              },
              {
                title: 'UF & MBR Module Design',
                description: 'Advanced filtration systems and lab testing equipment development',
                icon: '💧',
                skills: ['UF/MBR Technology', 'Membrane Design', 'Lab Testing Equipment', 'Filtration Systems']
              },
              {
                title: 'Project Management',
                description: 'Leading cross-cultural teams to deliver complex R&D projects',
                icon: '📊',
                skills: ['PMP (In Progress)', 'R&D Leadership', 'Cross-Cultural Teams', 'Innovation Management']
              }
            ].map((expertise, index) => (
              <motion.div
                key={expertise.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-all duration-300 group min-h-[280px] flex flex-col"
              >
                <div className="text-4xl mb-4">{expertise.icon}</div>
                <h3 className="text-xl font-bold mb-3">{expertise.title}</h3>
                <p className="text-slate-300 mb-4 flex-grow">{expertise.description}</p>
                <div className="space-y-2 mt-auto">
                  {expertise.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-400">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values - Modern Cards */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Core Values</h2>
            <p className="text-xl text-slate-600">Principles that guide every project and partnership</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Bridging cultures and technologies to create breakthrough solutions',
                icon: '💡',
                color: 'from-blue-600 to-blue-700'
              },
              {
                title: 'Excellence',
                description: 'German precision standards applied globally with uncompromising quality',
                icon: '⭐',
                color: 'from-yellow-500 to-yellow-600'
              },
              {
                title: 'Sustainability',
                description: 'Environmental responsibility and long-term value in every design',
                icon: '🌱',
                color: 'from-green-600 to-green-700'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white p-8 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern & Engaging */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-yellow-600/20"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Bridge Your Engineering Challenges?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Let's discuss how 26+ years of global experience in automation and filtration can accelerate your next project. 
              From concept to manufacturing, I'm your single point of contact for excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg">
                Start a Conversation
              </Button>
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
