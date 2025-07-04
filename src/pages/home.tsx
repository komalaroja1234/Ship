import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');  // Navigate to the login page instead of root
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-tech-darker text-tech-text">
      {/* Navbar */}
      <Navbar activeTab="home" />
      
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 px-6 flex flex-col items-center">
          <div className="absolute inset-0 bg-circuit-pattern bg-cover bg-center opacity-30 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-tech-darker/80 to-tech-darker z-0"></div>
          
          <div className="container mx-auto text-center relative z-1 space-y-8 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Intelligent AI-Powered <span className="text-gradient">Maritime Surveillance</span>
            </h1>
            
            <p className="text-xl text-tech-muted max-w-2xl mx-auto mb-10 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Advanced analytics and rule-based detection to enhance maritime security and operational efficiency
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <Button onClick={handleGetStarted} className="btn-primary group px-8 py-6 text-lg">
                <span>Get Started</span>
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/analytics')} className="border-tech-muted/30 text-tech-text px-8 py-6 text-lg hover:bg-tech-navy">
                View Demo
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <ChevronDown className="text-tech-muted" size={32} />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-tech-navy py-20 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Key Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Detection",
                  description: "Advanced algorithms to identify suspicious maritime activities in real-time",
                  icon: "🔍"
                },
                {
                  title: "Customizable Rule Engine",
                  description: "Create and manage your own detection rules based on specific requirements",
                  icon: "⚙️"
                },
                {
                  title: "Comprehensive Analytics",
                  description: "Detailed reports and visualizations to gain insights from maritime data",
                  icon: "📊"
                }
              ].map((feature, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-tech-muted">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button onClick={handleGetStarted} className="btn-primary group px-8 py-6 text-lg">
                <span>Access Platform</span>
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-circuit-pattern bg-cover bg-center opacity-20 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-tech-darker/90 to-tech-darker/50 z-0"></div>
          
          <div className="container mx-auto text-center relative z-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Maritime Operations?</h2>
            <p className="text-xl text-tech-muted max-w-2xl mx-auto mb-10">
              Join organizations worldwide using our platform to enhance security and efficiency
            </p>
            
            <Button onClick={handleGetStarted} className="btn-primary group px-10 py-6 text-lg">
              <span>Sign In Now</span>
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
