import { useMemo, useState } from "react";
import { Code2, Database, Gamepad2, Palette, Mail, Github, Linkedin, Twitter, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RGBText = ({ text, className }: { text: string; className: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span key={index} className="rgb-char">
          {char}
        </span>
      ))}
    </span>
  );
};

const AnimatedProfile = () => {
  // State for playlist animation
  const [isOpeningPlaylist, setIsOpeningPlaylist] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { toast } = useToast();

  // Memoize waveform data to prevent re-renders
  const waveformBars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      height: Math.random() * 20 + 5,
      duration: Math.random() * 2 + 1,
      delay: i * 0.1
    }));
  }, []);

  const scrollToContact = () => {
    // Scroll to the contact section
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback - scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const openPlaylist = () => {
    console.log('Opening playlist button clicked');
    
    // Visible debug - change page title
    document.title = 'BUTTON CLICKED - Opening Tab...';
    
    // Test if state updates work by setting button text immediately
    setIsOpeningPlaylist(true);
    setShowPopup(true);
    
    console.log('States set - isOpeningPlaylist:', true, 'showPopup:', true);
    
    // Wait 3 seconds before opening the tab
    setTimeout(() => {
      console.log('About to open window');
      const result = window.open('https://www.youtube.com/playlist?list=PLDibxa0jMrj5OQlq8X1YDev0JPagyZteQ', '_blank');
      console.log('Window.open result:', result);
      setIsOpeningPlaylist(false);
      setShowPopup(false);
      document.title = 'Tab Opened';
      console.log('States reset');
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Animated Profile */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzE0NWUzNiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHN2Zz4K')] opacity-20"></div>
        
        {/* Main profile container */}
        <div className="relative mb-8">
          {/* Central profile picture */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Profile image with gradient border */}
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden" data-testid="profile-container">
                  {/* Profile content */}
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-white tracking-wider" data-testid="text-hero-title">
                      BRAM
                    </div>
                    <div className="text-sm text-purple-300 font-medium tracking-wide" data-testid="text-hero-subtitle">
                      GAMER & DEVELOPER
                    </div>
                    {/* Audio waveform decoration */}
                    <div className="flex items-center justify-center space-x-1 mt-4" data-testid="waveform-container">
                      {waveformBars.map((bar, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-purple-400 animate-pulse-waveform"
                          style={{
                            height: `${bar.height}px`,
                            animationDuration: `${bar.duration}s`,
                            animationDelay: `${bar.delay}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated icons circling around the profile */}
            <div className="absolute inset-0 animate-spin-slow">
              {/* Icon 1 - Top */}
              <div 
                className="absolute w-16 h-16 -top-8 left-1/2 transform -translate-x-1/2"
                data-testid="icon-code"
                aria-label="Code development icon"
                title="Code development"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Icon 2 - Right */}
              <div 
                className="absolute w-16 h-16 -right-8 top-1/2 transform -translate-y-1/2"
                data-testid="icon-database"
                aria-label="Database management icon"
                title="Database management"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Icon 3 - Bottom */}
              <div 
                className="absolute w-16 h-16 -bottom-8 left-1/2 transform -translate-x-1/2"
                data-testid="icon-gamepad"
                aria-label="Gaming icon"
                title="Gaming"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Icon 4 - Left */}
              <div 
                className="absolute w-16 h-16 -left-8 top-1/2 transform -translate-y-1/2"
                data-testid="icon-palette"
                aria-label="Design and creativity icon"
                title="Design and creativity"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center shadow-lg">
                  <Palette className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* View My Playlist Button */}
          <button
            onClick={openPlaylist}
            disabled={isOpeningPlaylist}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 text-white px-8 py-6 rounded-full border border-red-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-xl flex items-center cursor-pointer z-10 relative disabled:cursor-not-allowed"
            data-testid="button-view-playlist"
          >
            <Play className="w-5 h-5 mr-3" />
            {isOpeningPlaylist ? 'Opening New Tab...' : 'View My Playlist'}
          </button>

          {/* Contact Me Button */}
          <button
            onClick={scrollToContact}
            className="bg-slate-800/80 hover:bg-slate-700/80 text-white px-8 py-6 rounded-full border border-slate-600/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-xl flex items-center cursor-pointer z-10 relative"
            data-testid="button-contact-me"
          >
            <Mail className="w-5 h-5 mr-3" />
            Contact Me
          </button>
        </div>
      </div>

      {/* About Me Section */}
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" data-testid="section-about-me">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-950/80 via-slate-900/80 to-blue-950/80 backdrop-blur-sm rounded-3xl border border-blue-800/30 p-12 shadow-2xl">
            <h2 className="text-6xl font-bold mb-12 mx-auto text-center" data-testid="text-about-title">
              <RGBText text="About Me" className="rgb-cinematic" />
            </h2>
            <div className="space-y-6 text-left max-w-4xl mx-auto">
              <div className="text-lg leading-relaxed" data-testid="text-about-description">
                <div className="space-y-4">
                  <p>
                    <span 
                      className="rgb-chromatic"
                      data-text="Welcome to my website! I'm Rado, a passionate 17-year-old beginner programmer with an insatiable curiosity for technology and creativity."
                    >
                      Welcome to my website! I'm Rado, a passionate 17-year-old beginner programmer with an insatiable curiosity for technology and creativity.
                    </span>
                  </p>
                  
                  <p>
                    <span 
                      className="rgb-chromatic"
                      data-text="As a beginner in programming, I'm constantly pushing myself to expand my knowledge and skills. I love experimenting with different programming languages and exploring their potential. I'm always on the lookout for new challenges and opportunities to hone my programming skills."
                    >
                      As a beginner in programming, I'm constantly pushing myself to expand my knowledge and skills. I love experimenting with different programming languages and exploring their potential. I'm always on the lookout for new challenges and opportunities to hone my programming skills.
                    </span>
                  </p>
                  
                  <p>
                    <span 
                      className="rgb-chromatic"
                      data-text="When I'm not programming, you can usually find me immersed in my favorite video games. Gaming has been a passion of mine for as long as I can remember, and it has helped me develop problem-solving skills, strategic thinking, and teamwork."
                    >
                      When I'm not programming, you can usually find me immersed in my favorite video games. Gaming has been a passion of mine for as long as I can remember, and it has helped me develop problem-solving skills, strategic thinking, and teamwork.
                    </span>
                  </p>
                  
                  <p>
                    <span 
                      className="rgb-chromatic"
                      data-text="In addition to my passion for programming and gaming, I am also good at fixing common problems in Windows. I enjoy troubleshooting and finding solutions to technical issues, and I'm always willing to lend a helping hand to those who need it."
                    >
                      In addition to my passion for programming and gaming, I am also good at fixing common problems in Windows. I enjoy troubleshooting and finding solutions to technical issues, and I'm always willing to lend a helping hand to those who need it.
                    </span>
                  </p>
                  
                  <p>
                    <span 
                      className="rgb-chromatic"
                      data-text="I am also a Christian, and I believe that my faith is an important part of my life. Christianity teaches me to love and respect others, and to be a kind and compassionate person. It also gives me hope and strength in difficult times."
                    >
                      I am also a Christian, and I believe that my faith is an important part of my life. Christianity teaches me to love and respect others, and to be a kind and compassionate person. It also gives me hope and strength in difficult times.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact-section" className="min-h-screen flex items-center justify-center px-4" data-testid="section-contact">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-600/30 p-12 shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-6" data-testid="text-contact-title">
              Let's Connect
            </h2>
            <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto" data-testid="text-contact-description">
              Ready to bring your next project to life? Whether it's gaming, development, or creative design, 
              I'm here to help turn your ideas into reality.
            </p>
            
            {/* Contact Options */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Email */}
              <div className="group cursor-pointer" data-testid="contact-email">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300 group-hover:scale-105">
                  <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <p className="text-purple-200">bram@example.com</p>
                </div>
              </div>

              {/* GitHub */}
              <div className="group cursor-pointer" data-testid="contact-github">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-400/20 group-hover:border-purple-400/40 transition-all duration-300 group-hover:scale-105">
                  <Github className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
                  <p className="text-purple-200">@bramdev</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="group cursor-pointer" data-testid="contact-linkedin">
                <div className="bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-2xl p-8 border border-pink-400/20 group-hover:border-pink-400/40 transition-all duration-300 group-hover:scale-105">
                  <Linkedin className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">LinkedIn</h3>
                  <p className="text-purple-200">Bram Developer</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-lg text-purple-300 mb-6">
                Let's discuss your next big idea
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                data-testid="button-start-conversation"
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Popup for Opening Tab */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-8 rounded-lg border-4 border-blue-500 shadow-2xl max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">Opening Tab</h2>
            <p className="text-lg">Your playlist will open in a new tab in 3 seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return <AnimatedProfile />;
}