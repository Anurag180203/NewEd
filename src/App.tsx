import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  ChevronRight, 
  Play, 
  Clock, 
  Star,
  CheckCircle,
  Menu,
  X,
  Code,
  Database,
  Globe,
  Smartphone,
  Zap,
  Target
} from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LoginSignupModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [googleUser, setGoogleUser] = useState<any>(null);
  const googleDivRef = useRef<HTMLDivElement>(null);

  const handleGoogleSuccess = (credentialResponse: any) => {
    const decodeJWT = (token: string) => {
      let base64Url = token.split('.')[1];
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    };
    if (credentialResponse.credential) {
      setGoogleUser(decodeJWT(credentialResponse.credential));
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <div className="mb-6 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-full font-medium ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-full font-medium ${mode === 'signup' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>
        {googleUser ? (
          <div className="text-center mb-4">
            <img src={googleUser.picture} alt="Profile" className="w-16 h-16 rounded-full mx-auto mb-2" />
            <div className="font-bold text-lg">Welcome, {googleUser.name}!</div>
            <div className="text-gray-600 text-sm mb-2">{googleUser.email}</div>
            <button className="mt-2 text-blue-600 underline" onClick={() => setGoogleUser(null)}>Logout</button>
          </div>
        ) : (
          <>
            <div ref={googleDivRef} className="flex justify-center mb-4" />
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-gray-200" />
              <span className="mx-2 text-gray-400 text-xs">or</span>
              <div className="flex-grow border-t border-gray-200" />
            </div>
            {mode === 'login' ? (
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full border rounded-lg px-3 py-2" placeholder="Enter your password" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mt-2">Login</button>
              </form>
            ) : (
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full border rounded-lg px-3 py-2" placeholder="Create a password" />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium mt-2">Sign Up</button>
              </form>
            )}
            {!googleUser && (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log('Login Failed')}
                width="100%"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    // You can log error here
  }
  resetError = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <div className="text-red-600 font-bold mb-4">Something went wrong.</div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={this.resetError}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showLoginSignup, setShowLoginSignup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'courses', 'tests', 'about'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and MongoDB",
      duration: "12 weeks",
      level: "Beginner to Advanced",
      students: 2847,
      rating: 4.9,
      price: "$199",
      icon: <Code className="w-8 h-8" />,
      skills: ["React", "Node.js", "MongoDB", "JavaScript", "CSS"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      description: "Learn Python, machine learning, and data visualization techniques",
      duration: "16 weeks",
      level: "Intermediate",
      students: 1923,
      rating: 4.8,
      price: "$249",
      icon: <Database className="w-8 h-8" />,
      skills: ["Python", "Pandas", "TensorFlow", "SQL", "Tableau"],
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile apps with React Native",
      duration: "10 weeks",
      level: "Intermediate",
      students: 1456,
      rating: 4.7,
      price: "$179",
      icon: <Smartphone className="w-8 h-8" />,
      skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Cloud Computing & DevOps",
      description: "Master AWS, Docker, Kubernetes and modern deployment practices",
      duration: "14 weeks",
      level: "Advanced",
      students: 982,
      rating: 4.9,
      price: "$299",
      icon: <Globe className="w-8 h-8" />,
      skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  const testSeries = [
    {
      id: 1,
      title: "Programming Fundamentals",
      questions: 150,
      duration: "3 hours",
      difficulty: "Beginner",
      topics: ["Data Structures", "Algorithms", "OOP", "Problem Solving"],
      price: "Free",
      attempted: 15420
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      questions: 200,
      duration: "4 hours",
      difficulty: "Advanced",
      topics: ["ES6+", "Async/Await", "Closures", "Prototypes"],
      price: "$29",
      attempted: 8730
    },
    {
      id: 3,
      title: "System Design Interview",
      questions: 75,
      duration: "2.5 hours",
      difficulty: "Expert",
      topics: ["Scalability", "Databases", "Caching", "Microservices"],
      price: "$49",
      attempted: 3210
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnHub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'courses', label: 'Courses' },
                { id: 'tests', label: 'Test Series' },
                { id: 'about', label: 'About' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowLoginSignup(true)}
              >
                Login
              </button>
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowLoginSignup(true)}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'courses', label: 'Courses' },
                  { id: 'tests', label: 'Test Series' },
                  { id: 'about', label: 'About' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium w-fit"
                  onClick={() => setShowLoginSignup(true)}
                >
                  Login
                </button>
                <button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium w-fit"
                  onClick={() => setShowLoginSignup(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Trusted by 50,000+ Students
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Technology
              </span>
              <br />
              Transform Your Career
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners who have advanced their careers with our comprehensive courses, 
              hands-on projects, and industry-recognized certifications.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Today
              </button>
              <button className="text-gray-700 px-8 py-4 rounded-full text-lg font-medium border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Browse Courses
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-600">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-600">Job Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted curriculum designed by industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${course.gradient}`}></div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${course.gradient} text-white`}>
                      {course.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{course.price}</div>
                      <div className="text-sm text-gray-500">per course</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {course.students.toLocaleString()} students
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      {course.level}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                      {course.rating} rating
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center">
                    Enroll Now
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Series Section */}
      <section id="tests" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Practice Test Series
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Test your knowledge and prepare for interviews with our comprehensive test series
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testSeries.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    test.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    test.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {test.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{test.title}</h3>

                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{test.questions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Attempted:</span>
                    <span className="font-medium">{test.attempted.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</div>
                  <div className="flex flex-wrap gap-2">
                    {test.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold text-gray-900">{test.price}</div>
                  {test.price === 'Free' && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose LearnHub?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're committed to providing world-class education that transforms careers and lives.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Award className="w-6 h-6" />,
                    title: "Industry-Recognized Certificates",
                    description: "Get certificates that employers value and trust"
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    title: "Expert Instructors",
                    description: "Learn from professionals working at top tech companies"
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Hands-on Projects",
                    description: "Build real-world projects that showcase your skills"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 bg-blue-100 text-blue-600 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of successful students who have transformed their careers with LearnHub.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Get Started Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">LearnHub</span>
              </div>
              <p className="text-gray-400">
                Empowering learners worldwide with cutting-edge technology education.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cloud Computing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ErrorBoundary>
        <LoginSignupModal open={showLoginSignup} onClose={() => setShowLoginSignup(false)} />
      </ErrorBoundary>
    </div>
  );
}

export default App;