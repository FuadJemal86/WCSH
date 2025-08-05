import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, Phone, Mail, MapPin, Clock, Users, Award, Heart, Stethoscope,
    Calendar, ArrowRight, ChevronDown, Star, Shield, Zap, Brain, Activity,
    Microscope, Plus, Play, CheckCircle, TrendingUp, Globe, Camera,
    User, UserCheck, Briefcase, GraduationCap, Building2, Siren,
    Baby, Bone, Eye, Zap as Lightning, ChevronLeft, ChevronRight,
    Facebook, Twitter, Instagram, Linkedin, Youtube, Mail as MailIcon,
    Phone as PhoneIcon, MapPin as LocationIcon, Clock as ClockIcon
} from 'lucide-react';
import { LifeLine } from 'react-loading-indicators';
import banner from '../../images/wcsh.jpg'
import banner2 from '../../images/wcsh1.png'
import nuro1 from '../../images/doc1.jpeg'
import nuro2 from '../../images/doc2.jpeg'
import nuro3 from '../../images/doc3.jpeg'
import nuro4 from '../../images/doc4.jpeg'
import nuro5 from '../../images/doc5.jpeg'

// Custom hook for scroll animations
type ScrollAnimationOptions = {
    threshold?: number;
    rootMargin?: string;
};

const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -100px 0px'
            }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, [options.threshold, options.rootMargin]);

    return { ref: elementRef, isVisible };
};

// Animation wrapper component
type AnimationType = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'rotateIn';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    animationType?: AnimationType;
    delay?: number;
    duration?: number;
    threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    className = '',
    animationType = 'fadeInUp',
    delay = 0,
    duration = 0.8,
    threshold = 0.1
}) => {
    const { ref, isVisible } = useScrollAnimation({ threshold });

    const animations: Record<AnimationType, { initial: React.CSSProperties; animate: React.CSSProperties }> = {
        fadeInUp: {
            initial: { opacity: 0, transform: 'translateY(60px)' },
            animate: { opacity: 1, transform: 'translateY(0px)' }
        },
        fadeInLeft: {
            initial: { opacity: 0, transform: 'translateX(-60px)' },
            animate: { opacity: 1, transform: 'translateX(0px)' }
        },
        fadeInRight: {
            initial: { opacity: 0, transform: 'translateX(60px)' },
            animate: { opacity: 1, transform: 'translateX(0px)' }
        },
        scaleIn: {
            initial: { opacity: 0, transform: 'scale(0.8)' },
            animate: { opacity: 1, transform: 'scale(1)' }
        },
        rotateIn: {
            initial: { opacity: 0, transform: 'rotate(-10deg) scale(0.9)' },
            animate: { opacity: 1, transform: 'rotate(0deg) scale(1)' }
        }
    };

    const animation = animations[animationType as AnimationType] || animations.fadeInUp;

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...animation.initial,
                ...(isVisible ? animation.animate : {}),
                transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </div>
    );
};

// Staggered animation container
interface StaggeredContainerProps {
    children: React.ReactElement[] | React.ReactElement;
    className?: string;
    staggerDelay?: number;
}

const StaggeredContainer: React.FC<StaggeredContainerProps> = ({ children, className = '', staggerDelay = 0.1 }) => {
    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        delay: index * staggerDelay
                    });
                }
                return child;
            })}
        </div>
    );
};

function Home() {
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Mock image paths - replace with your actual images
    const bannerImages = [banner, banner2];
    const doctorImages = {
        nuro2: nuro2,
        nuro3: nuro3,
        nuro4: nuro4,
        nuro1: nuro1,
        nuro5: nuro5
    };

    setTimeout(() => {
        setLoading(false);
    }, 3000);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'services', 'specialties', 'testimonials', 'gallery', 'team', 'news', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [bannerImages.length]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'services', label: 'Services' },
        { id: 'specialties', label: 'Specialties' },
        { id: 'team', label: 'Team' },
        { id: 'news', label: 'News' },
        { id: 'contact', label: 'Contact' }
    ];

    const services = [
        {
            icon: <Heart className="w-8 h-8" />,
            title: "Emergency Care",
            description: "24/7 emergency medical services with state-of-the-art equipment and experienced medical staff.",
            features: ["Trauma Center", "Cardiac Emergency", "Stroke Unit", "ICU Care"]
        },
        {
            icon: <Stethoscope className="w-8 h-8" />,
            title: "General Medicine",
            description: "Comprehensive medical care for all ages with specialized physicians and modern diagnostic tools.",
            features: ["Internal Medicine", "Family Practice", "Preventive Care", "Health Screenings"]
        },
        {
            icon: <Activity className="w-8 h-8" />,
            title: "Specialized Surgery",
            description: "Advanced surgical procedures performed by highly skilled surgeons in modern operating theaters.",
            features: ["Minimally Invasive", "Robotic Surgery", "Day Surgery", "Post-Op Care"]
        },
        {
            icon: <Calendar className="w-8 h-8" />,
            title: "Outpatient Services",
            description: "Convenient outpatient care including consultations, diagnostics, and follow-up treatments.",
            features: ["Same Day Service", "Diagnostic Tests", "Consultations", "Follow-ups"]
        }
    ];

    const specialties = [
        {
            icon: <Brain className="w-10 h-10" />,
            title: "Neurology",
            description: "Advanced neurological care and brain surgery",
            color: "from-purple-400 to-purple-600",
            image: nuro1
        },
        {
            icon: <Heart className="w-10 h-10" />,
            title: "Cardiology",
            description: "Comprehensive heart and cardiovascular care",
            color: "from-red-400 to-red-600",
            image: doctorImages.nuro2
        },
        {
            icon: <Microscope className="w-10 h-10" />,
            title: "Oncology",
            description: "Cancer treatment and care",
            color: "from-green-400 to-green-600",
            image: doctorImages.nuro3
        },
        {
            icon: <Baby className="w-10 h-10" />,
            title: "Pediatrics",
            description: "Specialized care for children",
            color: "from-blue-400 to-blue-600",
            image: doctorImages.nuro4
        },
        {
            icon: <Bone className="w-10 h-10" />,
            title: "Orthopedics",
            description: "Bone and joint specialists",
            color: "from-orange-400 to-orange-600",
            image: doctorImages.nuro1
        },
        {
            icon: <Lightning className="w-10 h-10" />,
            title: "Radiology",
            description: "Advanced imaging and diagnostics",
            color: "from-teal-400 to-teal-600",
            image: doctorImages.nuro5
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Patient",
            content: "The care I received at Worabe Hospital was exceptional. The staff was professional, caring, and made me feel comfortable throughout my treatment.",
            rating: 5,
            icon: <User className="w-16 h-16 text-amber-800" />
        },
        {
            name: "Dr. A/rehman Ali",
            role: "Referring Physician",
            content: "I consistently refer my patients to Worabe Hospital. Their expertise and patient-centered approach is unmatched in the region.",
            rating: 5,
            icon: <Stethoscope className="w-16 h-16 text-amber-800" />
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <LifeLine color="#ff9600" size="medium" text="" textColor="" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black overflow-x-hidden">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 w-full h-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-white/95'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-amber-800">WORABE</h1>
                                <p className="text-xs text-gray-600">Comprehensive Specialized Hospital</p>
                            </div>
                        </div>

                        <div className="hidden lg:flex space-x-6">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${activeSection === item.id
                                        ? 'text-amber-800 bg-amber-50'
                                        : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation - Show only on small screens */}
            <nav className={`lg:hidden fixed top-0 left-0 right-0 z-50 w-full h-20 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-white/95'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full">
                    <div className="flex justify-between items-center h-full">
                        <div className="flex items-center space-x-3 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-amber-800">WORABE</h1>
                                <p className="text-xs text-gray-600">Comprehensive Specialized Hospital</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t">
                        <div className="px-4 py-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === item.id
                                            ? 'text-amber-800 bg-amber-50'
                                            : 'text-gray-700 hover:text-amber-800 hover:bg-amber-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 rounded-bl-[70px] rounded-br-[70px]">
                <div className="absolute inset-0">
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <img
                            src={bannerImages[0]}
                            alt="Hospital Banner 1"
                            className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[10s]"
                            style={{ filter: 'blur(1px)' }}
                        />
                    </div>

                    {/* Image 2 */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <img
                            src={bannerImages[1]}
                            alt="Hospital Banner 2"
                            className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[10s]"
                            style={{ filter: 'blur(1px)' }}
                        />
                    </div>

                </div>

                <AnimatedSection
                    className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
                    animationType="fadeInUp"
                    duration={1.2}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        WORABE COMPREHENSIVE <br />
                        SPECIALIZED{' '}
                        <span className="text-amber-300">HOSPITAL</span>
                    </h1>

                    <AnimatedSection
                        animationType="fadeInUp"
                        delay={0.3}
                        className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto"
                    >
                        Transforming healthcare with cutting-edge technology, compassionate care, and medical excellence for our community's wellbeing.
                    </AnimatedSection>

                    <AnimatedSection
                        animationType="scaleIn"
                        delay={0.6}
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                    >
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="bg-amber-800 text-white px-10 py-4 rounded-full font-semibold hover:bg-amber-700 hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                        >
                            Book Appointment
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>

                        <button
                            onClick={() => scrollToSection('services')}
                            className="border-2 border-amber-800 text-white px-10 py-4 rounded-full font-semibold hover:bg-amber-800 hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/10 flex items-center justify-center"
                        >
                            <Play className="mr-2 w-5 h-5" />
                            Explore Services
                        </button>
                    </AnimatedSection>
                </AnimatedSection>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-10 h-10 text-white/70" />
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                            About <span className='text-amber-800'>Hospital</span>
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                            Leading healthcare innovation with a legacy of excellence and compassionate care
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                        <AnimatedSection animationType="fadeInLeft" className="space-y-8">
                            <h3 className="text-4xl font-bold mb-6 text-gray-800">Our Mission & <span className='text-amber-800'>Vision</span></h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                At Worabe Comprehensive Specialized Hospital, we are committed to delivering exceptional healthcare services that combine medical excellence with compassionate care.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We envision a healthier community where every individual has access to world-class medical care, supported by cutting-edge technology.
                            </p>

                            <StaggeredContainer className="grid grid-cols-2 gap-8">
                                <AnimatedSection className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-5xl font-bold text-amber-800 mb-2">25K+</div>
                                    <div className="text-gray-700 font-medium">Lives Saved</div>
                                </AnimatedSection>
                                <AnimatedSection className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-5xl font-bold text-amber-800 mb-2">98%</div>
                                    <div className="text-gray-700 font-medium">Success Rate</div>
                                </AnimatedSection>
                            </StaggeredContainer>
                        </AnimatedSection>

                        <StaggeredContainer className="space-y-6">
                            {[
                                {
                                    icon: <Award className="w-12 h-12" />,
                                    title: "Excellence in Care",
                                    description: "Internationally recognized for outstanding patient care and medical outcomes across multiple specialties."
                                },
                                {
                                    icon: <Users className="w-12 h-12" />,
                                    title: "Expert Medical Team",
                                    description: "Our physicians are board-certified specialists with extensive training from leading institutions."
                                },
                                {
                                    icon: <Heart className="w-12 h-12" />,
                                    title: "Compassionate Approach",
                                    description: "We treat every patient with dignity, respect, and compassion during their healing journey."
                                },
                                {
                                    icon: <Zap className="w-12 h-12" />,
                                    title: "Advanced Technology",
                                    description: "State-of-the-art medical equipment and innovative treatment methods for superior outcomes."
                                }
                            ].map((item, index) => (
                                <AnimatedSection
                                    key={index}
                                    animationType="fadeInRight"
                                    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="text-amber-800 group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h4>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </StaggeredContainer>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                            Our <span className='text-amber-800'>Services</span>
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive medical services designed to meet all your healthcare needs with excellence
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <StaggeredContainer className="grid lg:grid-cols-2 gap-8 mb-16" staggerDelay={0.2}>
                        {services.map((service, index) => (
                            <AnimatedSection
                                key={index}
                                animationType="scaleIn"
                                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-amber-200 hover:border-gray-100"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="text-amber-800 group-hover:scale-110 transition-transform duration-300 bg-amber-50 p-4 rounded-2xl">
                                        {service.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{service.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {service.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span className="text-sm text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <ArrowRight className="w-6 h-6 text-amber-800 group-hover:translate-x-2 transition-transform duration-300" />
                                </div>
                            </AnimatedSection>
                        ))}
                    </StaggeredContainer>

                    <AnimatedSection className="text-center" animationType="fadeInUp">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="bg-gradient-to-r from-amber-800 to-amber-900 text-white px-10 py-5 rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-800/25"
                        >
                            Schedule Consultation
                        </button>
                    </AnimatedSection>
                </div>
            </section>

            {/* Specialties Section */}
            <section id="specialties" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                            Medical <span className='text-amber-800'>Specialties</span>
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                            Expert care across multiple medical specialties with world-class physicians
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
                        {specialties.map((specialty, index) => (
                            <AnimatedSection
                                key={index}
                                animationType="rotateIn"
                                className="group relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        className="w-full  object-cover transition-opacity duration-700 group-hover:opacity-30"
                                        src={specialty.image}
                                        alt={specialty.title}

                                    />
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-br ${specialty.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>

                                <div className="p-8 relative z-10">
                                    <div className={`w-20 h-20 bg-gradient-to-br ${specialty.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500`}>
                                        {specialty.icon}
                                    </div>

                                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        {specialty.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                        {specialty.description}
                                    </p>

                                    <div className="mt-6 flex items-center text-amber-800 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 delay-300">
                                        <span className="font-semibold mr-2">Learn More</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </StaggeredContainer>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-gradient-to-r from-amber-800 to-amber-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Patient <span className='text-black'>Stories</span>
                        </h2>
                        <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                            Hear from those whose lives we've touched with our compassionate care
                        </p>
                        <div className="w-24 h-1 bg-white rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <AnimatedSection
                        animationType="scaleIn"
                        className="relative"
                    >
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                            <div className="text-center">
                                <div className="mb-6 flex justify-center">
                                    {testimonials[currentTestimonial].icon}
                                </div>
                                <div className="flex justify-center mb-6">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-2xl md:text-3xl text-white font-light mb-8 max-w-4xl mx-auto leading-relaxed">
                                    "{testimonials[currentTestimonial].content}"
                                </p>
                                <div className="text-center">
                                    <h4 className="text-xl font-semibold text-white">{testimonials[currentTestimonial].name}</h4>
                                    <p className="text-amber-200">{testimonials[currentTestimonial].role}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-white' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Team Section */}
            <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                            Meet Our <span className='text-amber-800'>Team</span>
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                            Dedicated healthcare professionals committed to your wellbeing
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
                        {[
                            {
                                name: "Dr. Ahmed Kedr",
                                role: "Chief Medical Officer",
                                specialty: "Internal Medicine",
                                experience: "15+ years",
                                icon: <UserCheck className="w-16 h-16 text-amber-800" />,
                                description: "Leading our medical team with expertise in complex diagnoses"
                            },
                            {
                                name: "Dr. Hanan Ahmed",
                                role: "Head of Surgery",
                                specialty: "General Surgery",
                                experience: "12+ years",
                                icon: <Activity className="w-16 h-16 text-amber-800" />,
                                description: "Pioneering minimally invasive surgical techniques"
                            },
                            {
                                name: "Dr. Mohammed Bilal",
                                role: "Emergency Director",
                                specialty: "Emergency Medicine",
                                experience: "10+ years",
                                icon: <Siren className="w-16 h-16 text-amber-800" />,
                                description: "Ensuring rapid response and critical care excellence"
                            },
                            {
                                name: "Dr. Shemsu Sultan",
                                role: "Pediatrics Head",
                                specialty: "Child Healthcare",
                                experience: "8+ years",
                                icon: <Baby className="w-16 h-16 text-amber-800" />,
                                description: "Compassionate care for our youngest patients"
                            }
                        ].map((member, index) => (
                            <AnimatedSection
                                key={index}
                                animationType="fadeInUp"
                                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                            >
                                <div className="text-center">
                                    <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                                        {member.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{member.name}</h3>
                                    <p className="text-amber-800 font-medium mb-1">{member.role}</p>
                                    <p className="text-gray-600 text-sm mb-2">{member.specialty}</p>
                                    <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                        {member.experience}
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </StaggeredContainer>
                </div>
            </section>

            {/* News Section */}
            <section id="news" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                            Latest <span className='text-amber-800'>News</span>
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                            Stay updated with our latest medical achievements and community health initiatives
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <StaggeredContainer className="grid md:grid-cols-2 gap-8" staggerDelay={0.2}>
                        {[
                            {
                                date: "July 25, 2025",
                                title: "New Robotic Surgery System Installed",
                                description: "Revolutionary robotic surgical system now operational, enabling precision surgeries with minimal invasive techniques.",
                                icon: <Activity className="w-12 h-12 text-blue-600" />,
                                category: "Technology"
                            },
                            {
                                date: "July 20, 2025",
                                title: "COVID-19 Vaccination Drive",
                                description: "Free vaccination campaign for the community continues with extended hours and new locations.",
                                icon: <Shield className="w-12 h-12 text-green-600" />,
                                category: "Health Campaign"
                            },
                            {
                                date: "July 15, 2025",
                                title: "Pediatric Heart Surgery Success",
                                description: "First successful pediatric heart surgery performed by our cardiac team, marking a milestone achievement.",
                                icon: <Heart className="w-12 h-12 text-red-600" />,
                                category: "Medical Achievement"
                            },
                            {
                                date: "July 10, 2025",
                                title: "New Diagnostic Lab Opens",
                                description: "State-of-the-art diagnostic laboratory with AI-powered analysis now serving patients 24/7.",
                                icon: <Microscope className="w-12 h-12 text-purple-600" />,
                                category: "Facility Update"
                            }
                        ].map((item, index) => (
                            <AnimatedSection
                                key={index}
                                animationType="fadeInUp"
                                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100"
                            >
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="text-sm text-gray-500">{item.date}</span>
                                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-amber-800 transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        <div className="mt-4 flex items-center text-amber-800 group-hover:translate-x-2 transition-transform duration-300">
                                            <span className="font-semibold mr-2">Read More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </StaggeredContainer>
                </div>
            </section>

            {/* contact section */}

            <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                            Contact <span className='text-amber-800'>Us</span>
                        </h2>
                        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                            Get in touch with us for appointments, inquiries, or emergency services
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-amber-600 rounded-full mx-auto mt-6"></div>
                    </AnimatedSection>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <AnimatedSection animationType="fadeInLeft" className="space-y-8">
                            <h3 className="text-3xl font-bold mb-8 text-gray-800">Get In Touch</h3>

                            <StaggeredContainer className="space-y-6">
                                {[
                                    {
                                        icon: <PhoneIcon className="w-8 h-8" />,
                                        title: "Emergency Hotline",
                                        details: "+251-911-123456",
                                        subtitle: "24/7 Emergency Services"
                                    },
                                    {
                                        icon: <MailIcon className="w-8 h-8" />,
                                        title: "Email Us",
                                        details: "info@worabehospital.com",
                                        subtitle: "General Inquiries"
                                    },
                                    {
                                        icon: <LocationIcon className="w-8 h-8" />,
                                        title: "Visit Us",
                                        details: "Worabe, SNNPR, Ethiopia",
                                        subtitle: "Main Hospital Campus"
                                    }
                                ].map((contact, index) => (
                                    <AnimatedSection
                                        key={index}
                                        className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="text-amber-800 flex-shrink-0">
                                            {contact.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-semibold mb-1 text-gray-800">{contact.title}</h4>
                                            <p className="text-lg text-gray-700 mb-1">{contact.details}</p>
                                            <p className="text-sm text-gray-600">{contact.subtitle}</p>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </StaggeredContainer>

                            <AnimatedSection animationType="scaleIn" delay={0.6} className="pt-8">
                                <h4 className="text-xl font-semibold mb-4 text-gray-800">Follow Us</h4>
                                <div className="flex space-x-4">
                                    {[
                                        { icon: <Facebook className="w-6 h-6" />, color: "hover:bg-blue-600" },
                                        { icon: <Twitter className="w-6 h-6" />, color: "hover:bg-blue-400" },
                                        { icon: <Instagram className="w-6 h-6" />, color: "hover:bg-pink-600" },
                                        { icon: <Linkedin className="w-6 h-6" />, color: "hover:bg-blue-700" },
                                        { icon: <Youtube className="w-6 h-6" />, color: "hover:bg-red-600" }
                                    ].map((social, index) => (
                                        <AnimatedSection
                                            key={index}
                                            animationType="scaleIn"
                                            delay={0.8 + index * 0.1}
                                            className={`p-3 bg-gray-100 rounded-full text-gray-600 hover:text-white transition-all duration-75 transform hover:scale-110 cursor-pointer ${social.color}`}
                                        >
                                            {social.icon}
                                        </AnimatedSection>
                                    ))}
                                </div>
                            </AnimatedSection>
                        </AnimatedSection>

                        <AnimatedSection animationType="fadeInRight" className="bg-white p-8 rounded-3xl shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h3>
                            <form className="space-y-6">
                                <StaggeredContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1}>
                                    <AnimatedSection>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300"
                                            placeholder="John"
                                        />
                                    </AnimatedSection>
                                    <AnimatedSection>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300"
                                            placeholder="Doe"
                                        />
                                    </AnimatedSection>
                                </StaggeredContainer>

                                <AnimatedSection delay={0.2}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300"
                                        placeholder="john.doe@example.com"
                                    />
                                </AnimatedSection>

                                <AnimatedSection delay={0.3}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300"
                                        placeholder="+251-911-123456"
                                    />
                                </AnimatedSection>

                                <AnimatedSection delay={0.4}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300">
                                        <option>General Inquiry</option>
                                        <option>Appointment Request</option>
                                        <option>Medical Records</option>
                                        <option>Billing Question</option>
                                        <option>Feedback</option>
                                    </select>
                                </AnimatedSection>

                                <AnimatedSection delay={0.5}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all duration-300 resize-none"
                                        placeholder="How can we help you today?"
                                    ></textarea>
                                </AnimatedSection>

                                <AnimatedSection delay={0.6}>
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-amber-800 to-amber-900 text-white py-4 rounded-xl font-semibold hover:from-amber-900 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        Send Message
                                    </button>
                                </AnimatedSection>
                            </form>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedSection
                        animationType="fadeInUp"
                        className="grid md:grid-cols-4 gap-8 mb-12"
                    >
                        <div className="col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full flex items-center justify-center">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">WORABE</h1>
                                    <p className="text-sm text-gray-400">Comprehensive Specialized Hospital</p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Committed to providing exceptional healthcare services with compassion, innovation, and excellence. Your health and wellbeing are our top priorities.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                {navItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => scrollToSection(item.id)}
                                            className="text-gray-400 hover:text-white transition-colors duration-300"
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-6">Services</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Emergency Care</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">General Medicine</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Surgery</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Diagnostics</li>
                                <li className="hover:text-white transition-colors duration-300 cursor-pointer">Outpatient Care</li>
                            </ul>
                        </div>
                    </AnimatedSection>

                    <div
                        className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
                    >
                        <p className="text-gray-400 text-sm">
                            © 2025 Worabe Comprehensive Specialized Hospital. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                Privacy Policy
                            </button>
                            <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                Terms of Service
                            </button>
                            <button className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                                Accessibility
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;