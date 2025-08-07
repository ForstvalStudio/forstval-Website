import { TEAM_MEMBERS } from '@/lib/constants'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-gradient">ForstvalStudio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are a tech-inclusive development studio where every technological 
            challenge finds its solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At ForstvalStudio, we believe that technology should be accessible 
              and inclusive. Whether you're looking to train cutting-edge LLMs, 
              develop immersive games, create stunning web applications, or build 
              enterprise solutions, we have the expertise to bring your vision to life.
            </p>
            <p className="text-gray-300">
              Our motto: "No tech dream is too ambitious, no project too complex. 
              We speak every language of technology."
            </p>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">🎯</span>
                <div>
                  <h3 className="font-semibold mb-1">Tailored Solutions</h3>
                  <p className="text-gray-400 text-sm">
                    Every project is unique, and we craft solutions that fit your specific needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">🚀</span>
                <div>
                  <h3 className="font-semibold mb-1">Cutting-Edge Technology</h3>
                  <p className="text-gray-400 text-sm">
                    We stay at the forefront of technology trends and best practices.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">🤝</span>
                <div>
                  <h3 className="font-semibold mb-1">Collaborative Partnership</h3>
                  <p className="text-gray-400 text-sm">
                    We work closely with you throughout the entire development process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="glass rounded-2xl p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-accent mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}