'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Unused
import type { TeamMember } from '@/lib/types';

interface TeamSectionProps {
  members: TeamMember[];
}

const TeamSection = ({ members }: TeamSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Meet Our Founder & Visionary
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-duration-300">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Profile Image */}
                    <div className="lg:col-span-1">
                      <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {member.social && (
                        <div className="flex justify-center space-x-4 mt-6">
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text/60 hover:text-primary transition-colors"
                            >
                              <Linkedin className="w-6 h-6" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text/60 hover:text-primary transition-colors"
                            >
                              <Twitter className="w-6 h-6" />
                            </a>
                          )}
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text/60 hover:text-primary transition-colors"
                            >
                              <Github className="w-6 h-6" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Profile Content */}
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <p className="text-primary text-lg mb-4">{member.position}</p>
                      <p className="text-text/80 mb-6 leading-relaxed">{member.bio}</p>

                      {/* Expertise */}
                      {(member as any).expertise && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3">Core Expertise</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(member as any).expertise.map((skill: string, skillIndex: number) => (
                              <div key={skillIndex} className="flex items-center">
                                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                                <span className="text-text/80">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Achievements */}
                      {(member as any).achievements && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                          <div className="space-y-2">
                            {(member as any).achievements.map((achievement: string, achIndex: number) => (
                              <div key={achIndex} className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></span>
                                <span className="text-text/80">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;