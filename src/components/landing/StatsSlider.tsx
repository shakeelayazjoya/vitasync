import { useEffect, useState } from "react";
import { Users, Apple, TrendingUp, Heart, Award, ShieldCheck, Leaf } from "lucide-react";

const stats = [
  { 
    icon: Users, 
    value: "15,000+", 
    label: "Active Users in Pakistan",
    color: "text-emerald-600"
  },
  { 
    icon: Apple, 
    value: "850+", 
    label: "Desi Dishes Recognized",
    color: "text-emerald-600"
  },
  { 
    icon: TrendingUp, 
    value: "3.2M+", 
    label: "Meals Logged",
    color: "text-emerald-600"
  },
  { 
    icon: Heart, 
    value: "96%", 
    label: "Users Feel Healthier",
    color: "text-emerald-600"
  },
  { 
    icon: Award, 
    value: "#1", 
    label: "Nutrition App in Pakistan",
    color: "text-emerald-600"
  },
  { 
    icon: ShieldCheck, 
    value: "100%", 
    label: "Data Protected",
    color: "text-emerald-600"
  },
];

const brands = [
  "Aga Khan University",
  "Shifa International Hospital",
  "LUMS Health Sciences",
  "Fitness Pakistan",
  "National Institute of Health",
  "Pakistan Nutrition Society",
  "WellnessPK",
];

const StatsSection = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 1.2); // Smooth & professional speed
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Text */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Leaf className="h-4 w-4" />
            JOIN THOUSANDS TRANSFORMING THEIR HEALTH
          </div>
          <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Join thousands who are transforming their health with{" "}
            <span className="font-semibold text-emerald-700">desi-friendly nutrition tracking</span>.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 hover:border-emerald-200 rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center bg-emerald-50 rounded-2xl group-hover:bg-emerald-100 transition-colors">
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              
              <div className="text-4xl font-bold text-gray-900 tracking-tighter mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By Section */}
        <div className="text-center">
          <p className="uppercase text-xs tracking-[2px] text-gray-500 font-medium mb-8">
            TRUSTED BY LEADING HEALTH & WELLNESS ORGANIZATIONS
          </p>

          {/* Infinite Scrolling Brands */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex gap-16 whitespace-nowrap py-4" style={{ transform: `translateX(${offset}px)` }}>
              {[...brands, ...brands, ...brands].map((brand, i) => (
                <span
                  key={i}
                  className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;