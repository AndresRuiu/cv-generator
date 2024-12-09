import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CVGeneratorLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Transforma tu Carrera con un CV Impecable
          </h1>
          <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
            Crea un currículum profesional, elegante y personalizado en minutos. 
            Destaca tus logros y aumenta tus posibilidades de conseguir tu próximo trabajo.
          </p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-10"
        >
          <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                  Tu CV, Tu Historia
                </h2>
                <p className="text-blue-600 mb-6">
                  Diseña un currículum que cuente tu historia profesional de manera única. 
                  Con herramientas intuitivas y diseños modernos, destacarás entre los demás.
                </p>
                <ul className="space-y-3 mb-6 text-blue-700">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-blue-500" />
                    Diseños profesionales
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-blue-500" />
                    Personalización completa
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 text-blue-500" />
                    Exportación a PDF
                  </li>
                </ul>
                <Link to="/cv-generator">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      bg-gradient-to-r from-blue-500 to-blue-600 
                      text-white 
                      px-6 py-3 
                      rounded-lg 
                      shadow-lg 
                      hover:shadow-xl 
                      transition-all 
                      flex items-center 
                      space-x-2
                    "
                  >
                    Crear mi CV Ahora
                    <ArrowRight className="ml-2" />
                  </motion.button>
                </Link>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center"
              >
                <div className="relative flex justify-center">
                  <div className="absolute -inset-2 bg-blue-200 rounded-xl blur-lg opacity-50"></div>
                  <img 
                    src="./cv-ejemplo.jpg" 
                    alt="CV Preview" 
                    className="relative z-10 rounded-xl shadow-2xl w-[80%]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold text-blue-900 mb-4">
            Beneficios de Usar Nuestro Generador de CV
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              { 
                title: "Diseño Profesional", 
                description: "Plantillas modernas que capturan la atención de reclutadores." 
              },
              { 
                title: "Fácil de Usar", 
                description: "Interfaz intuitiva que te guía paso a paso." 
              },
              { 
                title: "Personalización Total", 
                description: "Adapta cada sección a tu trayectoria única." 
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="
                  bg-white 
                  p-6 
                  rounded-xl 
                  shadow-lg 
                  border-b-4 
                  border-blue-500 
                  hover:border-blue-600 
                  transition-all
                "
              >
                <h4 className="text-xl font-bold text-blue-800 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-blue-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CVGeneratorLanding;
