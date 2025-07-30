
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Palette, Video, Download, ExternalLink } from 'lucide-react';
import ModernNavigation from '@/components/ModernNavigation';

const Resources = () => {
  const resourceCategories = [
    {
      title: "Drawing Tools & Software",
      icon: Palette,
      items: [
        { name: "Procreate", type: "Mobile App", link: "https://procreate.com/" },
        { name: "Adobe Photoshop", type: "Desktop", link: "https://www.adobe.com/products/photoshop.html" },
        { name: "Clip Studio Paint", type: "Desktop", link: "https://www.clipstudio.net/en/" },
        { name: "Paint Tool Sai", type: "Desktop outdated but loved", link: "https://www.systemax.jp/en/sai/" }
      ]
    },
    {
      title: "Learning Resources",
      icon: BookOpen,
      items: [
        { name: "Learning Drawing from Scratch", type: "Video Course", link: "https://www.youtube.com/watch?v=1jjmOF1hQqI&list=PL0V_JTTg_6baV8tBE4Qm1O8Vhxy59GTah" },
        { name: "Start HERE with Digital Art", type: "Youtube/Digital Art", link: "https://www.youtube.com/watch?v=noNbuBqvxQE" },
        { name: "Installing and using Procreate", type: "Digital Art", link: "https://www.youtube.com/watch?v=oo8_NODWjbw" },
        { name: "Importing brushes in Procreate", type: "Brush Packs", link: "https://www.youtube.com/watch?v=1TISRfOEizg" }
      ]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      items: [
        { name: "How to paint like Akihiko Yoshida", type: "YouTube", link: "https://www.youtube.com/watch?v=IKMBUxYIeSg" },
        { name: "How to color and render skin", type: "YouTube", link: "https://www.youtube.com/watch?v=Am7WVUoCFKw" },
        { name: "Color Theory for beginners", type: "YouTube", link: "https://www.youtube.com/watch?v=IQoO33m7u-M" },
        { name: "tips for RENDERING Digital Art(coloring and shading tutorial)", type: "YouTube", link: "https://www.youtube.com/watch?v=OvSgbLVTmZI" }
      ]
    },
    {
      title: "Resources",
      icon: Download,
      items: [
        { name: "Purchasable Brush Packs", type: "Download", link: "https://gumroad.com/discover?query=brush+packs" },
        { name: "Color Palettes", type: "Tools", link: "https://coolors.co/" },
        { name: "Glam Inspiration", type: "FFXIV Resources", link: "https://ffxiv.eorzeacollection.com/glamours" },
        { name: "FFXIV Official Discord", type: "Discord", link: "https://discord.com/invite/ffxiv" }
      ]
    }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 dark:from-blue-900 dark:via-blue-900 dark:to-blue-10 noise-overlay">
      <ModernNavigation 
        title="Resources" 
        subtitle="Everything you need for your artistic journey"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Side Info Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  About Resources
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  This comprehensive resource hub is designed to support aspiring artists at every stage of their journey.
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  From essential drawing tools to advanced tutorials, find everything you need to enhance your artistic skills and participate in our community events.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* What is an Art Party Section */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-6">
                  What is an Art Party?
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Art parties are collaborative creative events where artists of all skill levels come together to create, learn, and share their passion for art. These events can range from structured workshops and classes to informal gatherings where participants work on personal projects while enjoying the company of fellow artists.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Whether you're a beginner looking to learn new techniques or an experienced artist wanting to connect with others, art parties provide a supportive environment for creative growth and community building.
                </p>
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/50 dark:to-blue-900/50 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">Benefits of Art Parties:</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></span>
                      <span>Learn new techniques from experienced artists</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></span>
                      <span>Build connections with fellow artists</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></span>
                      <span>Get inspired by different art styles and approaches</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"></span>
                      <span>Receive constructive feedback on your work</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Resource Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resourceCategories.map((category, index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/30 shadow-xl rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">
                        {category.title}
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                          <a
                              key={itemIndex}
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                          >
                            <div className="flex items-center justify-between p-3 bg-white/40 dark:bg-slate-700/40 rounded-lg hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer group">
                              <div>
                                <div className="font-medium text-slate-700 dark:text-slate-300">
                                  {item.name}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {item.type}
                                </div>
                              </div>
                              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-colors" />
                            </div>
                          </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
