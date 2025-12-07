import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Server, 
  Database, 
  Code, 
  Terminal, 
  Cpu, 
  Layout, 
  ArrowRight, 
  ChevronLeft,
  GitBranch,
  Activity,
  Layers,
  Container,
  Clock,
  Award,
  Zap,
  CheckCircle,
  Briefcase
} from 'lucide-react';

// --- MOCK DATA ---

const SKILLS_DATA = {
  "DevOps & Cloud": [
    { name: "Kubernetes (EKS/GKE)", level: 95 },
    { name: "Docker & Containerization", level: 98 },
    { name: "Terraform (IaC)", level: 90 },
    { name: "AWS Architecture", level: 92 },
    { name: "GitHub Actions / CI/CD", level: 88 },
  ],
  "MLOps & Data": [
    { name: "MLflow Registry", level: 92 },
    { name: "DVC pipelines", level: 85 },
    { name: "Apache Airflow", level: 80 },
    { name: "Model Serving (TorchServe)", level: 85 },
    { name: "Prometheus Monitoring", level: 75 }
  ],
  "Full Stack": [
    { name: "Python (Django/FastAPI)", level: 96 },
    { name: "React.js & Tailwind", level: 85 },
    { name: "PostgreSQL Optimization", level: 88 },
    { name: "Redis Caching", level: 82 },
  ]
};

const EXPERIENCE_DATA = [
  {
    role: "Senior MLOps Engineer",
    company: "DataFlow Systems",
    period: "2023 - Present",
    desc: "Architecting automated retraining pipelines reducing model drift by 40%. Managing EKS clusters for serving LLMs."
  },
  {
    role: "DevOps Engineer",
    company: "CloudScale Inc.",
    period: "2021 - 2023",
    desc: "Migrated legacy monoliths to microservices on AWS. Implemented Blue/Green deployment strategies using ArgoCD."
  },
  {
    role: "Backend Developer",
    company: "StartUp Node",
    period: "2019 - 2021",
    desc: "Built high-performance REST APIs with Django and optimized PostgreSQL queries for real-time analytics."
  }
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Predictive Maintenance System",
    category: "MLOps",
    shortDesc: "End-to-end ML pipeline for industrial equipment failure prediction.",
    fullDesc: "A complete MLOps platform that predicts machinery failure 48 hours in advance. Built with a Django backend for metadata management and a React dashboard for real-time alerts. The system uses a retrain-on-drift strategy triggered by Airflow.",
    tags: ["Python", "TensorFlow", "MLflow", "Airflow", "Docker", "AWS SageMaker"],
    github: "https://github.com/yourusername/predictive-maint",
    demo: "https://demo-link.com",
    features: [
      "Automated training pipelines with Apache Airflow",
      "Model registry and versioning using MLflow",
      "Real-time inference API deployed on AWS Lambda",
      "Drift detection triggers automatic retraining"
    ],
    architecture: {
      type: "MLOps Pipeline",
      details: "Kafka -> Airflow -> SageMaker -> MLflow -> FastAPI/K8s"
    },
    metrics: {
      accuracy: "94.5%",
      latency: "120ms",
      uptime: "99.9%"
    }
  },
  {
    id: 2,
    title: "Cloud-Native E-Commerce",
    category: "DevOps",
    shortDesc: "Microservices-based e-commerce app orchestrated with Kubernetes.",
    fullDesc: "A highly scalable e-commerce application decomposed into microservices (Auth, Product, Order). Deployed on an EKS cluster using Helm charts with a fully automated CI/CD pipeline implemented in GitHub Actions.",
    tags: ["React", "Django", "Kubernetes", "Terraform", "Helm", "GitHub Actions"],
    github: "https://github.com/yourusername/ecommerce-k8s",
    demo: "https://demo-link.com",
    features: [
      "Infrastructure Provisioning with Terraform (IaC)",
      "Blue/Green Deployment strategy using ArgoCD",
      "Centralized logging with ELK Stack",
      "Auto-scaling based on CPU/Memory metrics"
    ],
    architecture: {
      type: "Microservices",
      details: "React -> ALB -> Ingress -> Django/Node -> RDS"
    },
    metrics: {
      deploymentFreq: "15/day",
      leadTime: "< 30 mins",
      failureRate: "< 1%"
    }
  },
  {
    id: 3,
    title: "Django Portfolio API",
    category: "Full Stack",
    shortDesc: "The headless CMS backend powering this very portfolio.",
    fullDesc: "A robust REST API built with Django REST Framework to manage projects, skills, and resume data. Consumed by a React frontend to serve content dynamically.",
    tags: ["Django REST Framework", "PostgreSQL", "React", "JWT Auth", "Heroku"],
    github: "https://github.com/yourusername/portfolio-api",
    demo: "#",
    features: [
      "Decoupled architecture (Headless CMS)",
      "JWT Authentication for admin management",
      "Optimized database queries with select_related",
      "Automated unit tests with Pytest"
    ],
    architecture: {
      type: "Monolith",
      details: "React SPA -> REST API (Django) -> PostgreSQL"
    },
    metrics: null
  }
];

// --- STYLES FOR ANIMATIONS ---
const styles = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
  }
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .glass-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

// --- COMPONENTS ---

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-900/30 text-blue-300 border-blue-700/50",
    green: "bg-emerald-900/30 text-emerald-300 border-emerald-700/50",
    purple: "bg-purple-900/30 text-purple-300 border-purple-700/50",
    gray: "bg-slate-800 text-slate-300 border-slate-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const NavBar = ({ setPage, currentPage }) => (
  <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center cursor-pointer group" onClick={() => setPage('home')}>
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold text-white tracking-tight">
            DevOps<span className="text-cyan-400">.MLOps</span>
          </span>
        </div>
        <div className="flex items-center space-x-8">
          {['home', 'projects', 'skills'].map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`capitalize font-medium text-sm transition-all duration-200 ${
                currentPage === item 
                  ? "text-cyan-400" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ setPage }) => (
  <div className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden pt-16">
    {/* Animated Background Blobs */}
    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/50 border border-cyan-500/30 text-cyan-400 font-medium text-sm mb-8 fade-in-up">
          <span className="flex h-2 w-2 relative mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Open to New Opportunities
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 fade-in-up" style={{animationDelay: '0.1s'}}>
          Architecting the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Intelligent Infrastructure
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400 mb-10 fade-in-up" style={{animationDelay: '0.2s'}}>
          I bridge the gap between <strong>Data Science</strong> and <strong>Operations</strong>. 
          Specializing in building scalable MLOps pipelines, resilient Cloud Architectures, and production-grade Full Stack applications.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in-up" style={{animationDelay: '0.3s'}}>
          <button
            onClick={() => setPage('projects')}
            className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.5)]"
          >
            View My Work
            <ArrowRight className="inline-block ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-slate-700 transition-all flex items-center justify-center">
            <Github className="mr-2 h-5 w-5" /> GitHub Profile
          </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12 fade-in-up" style={{animationDelay: '0.5s'}}>
        {[
          { label: "Years Exp.", value: "5+" },
          { label: "Projects", value: "30+" },
          { label: "Pipelines", value: "100+" },
          { label: "Uptime", value: "99.9%" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MethodologySection = () => (
  <div className="bg-slate-900 py-24 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">How I Work</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          My workflow is designed for speed, reliability, and reproducibility.
        </p>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        {[
          { icon: <Zap className="h-6 w-6" />, title: "Discovery", desc: "Understanding the data and business requirements." },
          { icon: <Code className="h-6 w-6" />, title: "Development", desc: "Building modular code with test-driven development." },
          { icon: <GitBranch className="h-6 w-6" />, title: "Automation", desc: "Setting up CI/CD and MLOps pipelines." },
          { icon: <Activity className="h-6 w-6" />, title: "Monitoring", desc: "Tracking metrics and drift in production." },
        ].map((step, i) => (
          <div key={i} className="glass-card p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-30 transition duration-500 blur"></div>
            <div className="relative bg-slate-900 p-6 rounded-xl h-full border border-slate-800">
              <div className="h-12 w-12 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceSection = () => (
  <div className="bg-slate-950 py-24 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Briefcase className="mr-3 text-cyan-500" /> Professional Journey
          </h2>
          <div className="space-y-8 border-l-2 border-slate-800 ml-3 pl-8 relative">
            {EXPERIENCE_DATA.map((exp, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-950 bg-cyan-500"></span>
                <div className="mb-1 text-sm text-cyan-400 font-mono">{exp.period}</div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <div className="text-slate-400 mb-2 font-medium">{exp.company}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="mr-3 text-purple-500" /> Certifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "AWS Certified Solutions Architect",
              "Certified Kubernetes Admin (CKA)",
              "TensorFlow Developer Cert",
              "HashiCorp Terraform Associate"
            ].map((cert, i) => (
              <div key={i} className="flex items-center p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-colors">
                <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                <span className="text-slate-300 font-medium text-sm">{cert}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Detailed Resume</h3>
            <p className="text-slate-400 text-sm mb-4">
              Download my full resume to see detailed project histories and publication lists.
            </p>
            <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center">
              Download PDF <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkillsSection = () => (
  <div className="bg-slate-900 py-24 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white text-center mb-16">Technical Arsenal</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(SKILLS_DATA).map(([category, skills]) => (
          <div key={category} className="glass-card p-8 rounded-xl hover:bg-slate-800 transition-colors duration-300">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              {category === "DevOps & Cloud" && <Container className="mr-3 h-6 w-6 text-cyan-400" />}
              {category === "MLOps & Data" && <Activity className="mr-3 h-6 w-6 text-purple-400" />}
              {category === "Full Stack" && <Layers className="mr-3 h-6 w-6 text-blue-400" />}
              {category}
            </h3>
            <div className="space-y-6">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                    <span className="text-xs text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${
                        category.includes('DevOps') ? 'bg-cyan-500' :
                        category.includes('MLOps') ? 'bg-purple-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectList = ({ setPage, setSelectedProject }) => (
  <div className="min-h-screen bg-slate-950 pt-24 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 fade-in-up">
        <h2 className="text-3xl font-extrabold text-white">Featured Projects</h2>
        <p className="mt-4 text-xl text-slate-400">
          A showcase of operational excellence and full-stack engineering.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_DATA.map((project, idx) => (
          <div 
            key={project.id} 
            className="group bg-slate-900 flex flex-col rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 border border-slate-800 hover:border-cyan-500/50 cursor-pointer fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
            onClick={() => { setSelectedProject(project); setPage('projectDetail'); }}
          >
            {/* Mock Image Placeholder */}
            <div className="h-48 bg-slate-800 w-full relative overflow-hidden">
               <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${
                 project.category === 'MLOps' ? 'from-purple-600 to-slate-900' : 
                 project.category === 'DevOps' ? 'from-cyan-600 to-slate-900' : 
                 'from-blue-600 to-slate-900'
               }`}></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 {project.category === 'MLOps' && <Activity className="h-12 w-12 text-purple-500 opacity-50" />}
                 {project.category === 'DevOps' && <Server className="h-12 w-12 text-cyan-500 opacity-50" />}
                 {project.category === 'Full Stack' && <Layout className="h-12 w-12 text-blue-500 opacity-50" />}
               </div>
            </div>

            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <Badge color={project.category === "MLOps" ? "purple" : project.category === "DevOps" ? "green" : "blue"}>
                  {project.category}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectDetail = ({ project, setPage }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  return (
    <div className="bg-slate-950 min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setPage('projects')}
          className="flex items-center text-slate-400 hover:text-cyan-400 transition mb-8 group"
        >
          <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition" /> Back to Projects
        </button>
        
        <div className="grid lg:grid-cols-3 gap-12 fade-in-up">
          {/* Left Column: Main Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-extrabold text-white mb-4">{project.title}</h1>
            <p className="text-xl text-slate-400 mb-8 font-light">{project.shortDesc}</p>
            
            <section className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
              <p className="text-slate-300 leading-relaxed text-lg">{project.fullDesc}</p>
            </section>

            <section className="mb-10">
              <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Architecture Section */}
            <section className="bg-slate-900 rounded-xl p-1 border border-slate-800 shadow-xl overflow-hidden">
               <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                 <div className="flex items-center">
                    <GitBranch className="h-5 w-5 text-purple-400 mr-2" />
                    <span className="font-mono text-sm text-slate-300">Architecture & Pipeline</span>
                 </div>
                 <div className="flex space-x-2">
                   <div className="h-3 w-3 rounded-full bg-red-500/20"></div>
                   <div className="h-3 w-3 rounded-full bg-yellow-500/20"></div>
                   <div className="h-3 w-3 rounded-full bg-green-500/20"></div>
                 </div>
               </div>
               <div className="p-6 font-mono text-sm text-cyan-300 overflow-x-auto">
                 {`> Component Type: ${project.architecture.type}\n> Pipeline Flow:\n  ${project.architecture.details}`}
               </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-xl">
              <h4 className="font-bold text-white mb-4">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Display */}
            {project.metrics && (
              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
                <h4 className="font-bold text-white mb-4 flex items-center relative z-10">
                  <Activity className="h-4 w-4 mr-2 text-cyan-400" /> Live Metrics
                </h4>
                <div className="space-y-4 relative z-10">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center pb-2 border-b border-slate-800 last:border-0">
                      <span className="capitalize text-slate-400 text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-mono font-bold text-cyan-400">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <a href={project.github} className="flex items-center justify-center w-full px-4 py-3 border border-slate-700 rounded-lg text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 transition">
                <Github className="mr-2 h-4 w-4" /> View Source Code
              </a>
              <a href={project.demo} className="flex items-center justify-center w-full px-4 py-3 border border-transparent rounded-lg text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-white text-lg font-bold mb-4">DevOps<span className="text-cyan-500">.MLOps</span></h3>
        <p className="text-sm leading-relaxed max-w-xs">
          Building the automated bridges between complex data science and reliable production infrastructure.
        </p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Connect</h4>
        <div className="flex space-x-4">
          <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-cyan-500 hover:text-white transition"><Github className="h-5 w-5" /></a>
          <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-cyan-500 hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <p className="text-sm">hello@example.com</p>
        <p className="text-sm mt-1">San Francisco, CA</p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} DevOps Portfolio. Built with React & Django.</p>
    </div>
  </footer>
);

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      <style>{styles}</style>
      <NavBar setPage={setPage} currentPage={page} />
      
      <main>
        {page === 'home' && (
          <>
            <Hero setPage={setPage} />
            <MethodologySection />
            <ExperienceSection />
            <SkillsSection />
          </>
        )}
        
        {page === 'projects' && (
          <ProjectList setPage={setPage} setSelectedProject={setSelectedProject} />
        )}
        
        {page === 'projectDetail' && (
          <ProjectDetail project={selectedProject} setPage={setPage} />
        )}
        
        {page === 'skills' && (
          <div className="pt-24 bg-slate-950 min-h-screen">
            <SkillsSection />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}