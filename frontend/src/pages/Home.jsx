import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Stethoscope, User, ArrowRight, Shield, Zap, Smile } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Health Chat',
      description: 'Get instant, personalized health advice from our AI assistant powered by advanced language models.',
      color: 'from-blue-500 to-cyan-500',
      link: '/chat',
    },
    {
      icon: Stethoscope,
      title: 'Health Tips',
      description: 'Discover daily wellness tips covering nutrition, exercise, mental health, and sleep.',
      color: 'from-green-500 to-emerald-500',
      link: '/health-tips',
    },
    {
      icon: User,
      title: 'Health Profile',
      description: 'Track your personal health metrics including age, weight, height, and blood group.',
      color: 'from-purple-500 to-pink-500',
      link: '/profile',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your health data is stored securely and never shared.',
    },
    {
      icon: Zap,
      title: 'Instant Responses',
      description: 'Get answers to your health questions in seconds.',
    },
    {
      icon: Smile,
      title: '24/7 Available',
      description: 'Access health guidance anytime, anywhere.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Heart className="w-4 h-4" fill="currentColor" />
          Your Personal Health Assistant
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            HealthBuddy
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Your AI-powered companion for personalized health advice, wellness tips,
          and health tracking. Get answers to your health questions instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            Start Chatting
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/health-tips"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 border border-slate-200"
          >
            <Stethoscope className="w-5 h-5" />
            Get Health Tips
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={feature.link}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-transparent"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
          Why Choose HealthBuddy?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Your Health Journey?
        </h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto">
          Create your profile and start chatting with our AI health assistant today.
        </p>
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <User className="w-5 h-5" />
          Create Your Profile
        </Link>
      </section>
    </div>
  );
}

export default Home;
