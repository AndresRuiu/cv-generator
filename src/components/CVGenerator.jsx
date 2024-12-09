import { useState, useEffect } from 'react';
import { Edit, Eye, Home } from 'lucide-react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ToastProvider, 
  ToastViewport, 
} from '@/components/ui/toast';
import { useToast } from '@//hooks/use-toast';
import CVPreview from './CVPreview'; 
import CVForm from './CVForm';

const COLOR_PALETTES = [
    { 
        name: 'Blue Ocean', 
        headerBg: '#E6F2FF',  
        contactBg: '#F0F9FF', 
        divider: '#93C5FD'    
    },
    { 
        name: 'Sky Blue', 
        headerBg: '#E0F2FE',  
        contactBg: '#F0F9FF', 
        divider: '#7DD3FC'    
    },
    { 
        name: 'Indigo', 
        headerBg: '#E0E7FF',
        contactBg: '#EEF2FF', 
        divider: '#A5B4FC' 
    },
    { 
        name: 'Teal', 
        headerBg: '#F0FDFA',
        contactBg: '#F5FFFE',
        divider: '#5EEAD4'
    },
    { 
        name: 'Default Gray', 
        headerBg: '#F3F4F6',
        contactBg: '#F9FAFB',
        divider: '#D1D5DB'
    }
];

const LANGUAGE_OPTIONS = [
    { language: 'Español', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Inglés', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Francés', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Alemán', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Portugués', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Italiano', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Chino', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Ruso', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] }
];

const CVGenerator = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('edit');
    const [colorPalette, setColorPalette] = useState(COLOR_PALETTES[0]);
    const [formData, setFormData] = useState({
        profileImage: null,
        name: 'Santiago',
        lastName: 'Peralta',
        title: 'Desarrollador FullStack y Consultor Tecnológico',
        contact: {
            location: 'Córdoba, Argentina',
            phone: '+543515678901',
            email: 'santiago.peralta.dev@gmail.com',
            linkedin: 'https://linkedin.com/in/santiago-peralta',
            github: 'https://github.com/santiagoperalta',
            portfolio: 'https://santiagoperalta.dev'
        },
        summary: 'Soy un desarrollador FullStack con más de 3 años de experiencia en el sector tecnológico. Apasionado por resolver problemas complejos y aprender nuevas tecnologías. Actualmente colaboro con empresas para construir soluciones innovadoras.',
        skills: [
            'JavaScript',
            'TypeScript',
            'React.js',
            'Node.js',
            'Express.js',
            'PostgreSQL',
            'MongoDB',
            'GraphQL',
            'Docker',
            'Kubernetes',
            'AWS'
        ],
        education: [
            {
                degree: 'Licenciatura en Sistemas de Información',
                institution: 'Universidad Nacional de Córdoba',
                period: '2016 - 2021'
            },
            {
                degree: 'Diplomatura en Desarrollo FullStack',
                institution: 'Universidad Tecnológica Nacional',
                period: '2022'
            }
        ],
        workExperience: [
            {
                company: 'SoftCraft Solutions',
                period: '2021 - 2023',
                roles: [
                    'Desarrollo de aplicaciones web utilizando React.js y Node.js',
                    'Mantenimiento de bases de datos relacionales y no relacionales',
                    'Implementación de microservicios en entornos cloud'
                ]
            },
            {
                company: 'Freelance',
                period: '2023 - Presente',
                roles: [
                    'Creación de soluciones personalizadas para clientes locales e internacionales',
                    'Automatización de procesos empresariales con herramientas modernas',
                    'Consultoría tecnológica para pequeñas y medianas empresas'
                ]
            }
        ],
        languages: [
            { language: 'Español', level: 'Nativo' },
            { language: 'Inglés', level: 'B2' }
        ]
    });

    // Generalized update function for nested objects
    const updateFormData = (path, value) => {
        const updateNestedState = (obj, path, value) => {
            const keys = path.split('.');
            const lastKey = keys.pop();
            const target = keys.reduce((acc, key) => acc[key], obj);
            target[lastKey] = value;
            return { ...obj };
        };

        setFormData(prevData => updateNestedState(prevData, path, value));
    };

    const handleLanguageChange = (index, field, value) => {
        const newLanguages = [...formData.languages];
        newLanguages[index] = { ...newLanguages[index], [field]: value };
        setFormData(prev => ({ ...prev, languages: newLanguages }));
    };

    const addLanguage = () => {
        setFormData(prev => ({
            ...prev,
            languages: [...prev.languages, { language: 'Nuevo Idioma', level: 'A1' }]
        }));
    };

    const removeLanguage = (index) => {
        if (formData.languages.length > 1) {
            const newLanguages = formData.languages.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, languages: newLanguages }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            updateFormData('profileImage', reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const savedCV = localStorage.getItem('savedCV');
        if (savedCV) {
            setFormData(JSON.parse(savedCV));
        }
    }, []);

    const handleSaveForm = (formValues) => {
        const updatedFormData = {
            ...formValues,
            colorPalette: formValues.colorPalette || colorPalette
        };

        setFormData(updatedFormData);
        setColorPalette(updatedFormData.colorPalette);
        localStorage.setItem('savedCV', JSON.stringify(updatedFormData));
        
        toast({
            title: "Currículum Guardado",
            description: "Los cambios se han guardado exitosamente.",
            duration: 3000,
        });
    };

    return (
        <ToastProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Return to Home Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bottom-6 left-6 fixed md:absolute md:top-6"
                    >
                        <Link 
                            to="/" 
                            className="
                                flex items-center 
                                bg-white 
                                text-blue-700 
                                px-3 py-3 
                                rounded-lg 
                                shadow-md 
                                hover:bg-blue-50 
                                transition-all 
                                group
                            "
                        >
                            <Home className="group-hover:-scale-x-100 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Título y Descripción */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
                            Generador de Currículum
                        </h1>
                        <p className="text-xl text-blue-700 max-w-2xl mx-auto">
                            Diseña un currículum que cuente tu historia profesional. 
                            Personaliza cada detalle y destaca tus logros.
                        </p>
                    </motion.div>
    
                    {/* Tab Selector with Enhanced Design */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex mb-6 bg-white rounded-xl shadow-lg p-1.5 max-w-md mx-auto"
                    >
                        <button 
                            onClick={() => setActiveTab('edit')}
                            className={`
                                flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-300 
                                ${activeTab === 'edit' 
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-blue-50'}
                            `}
                        >
                            <Edit className="mr-2" size={20} />
                            Editar CV
                        </button>
                        <button 
                            onClick={() => setActiveTab('preview')}
                            className={`
                                flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-300
                                ${activeTab === 'preview' 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-blue-50'}
                            `}
                        >
                            <Eye className="mr-2" size={20} />
                            Vista Previa
                        </button>
                    </motion.div>
    
                    {/* Content Container with Enhanced Design */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {activeTab === 'edit' && (
                            <CVForm 
                                initialData={formData}
                                onSave={handleSaveForm}
                                colorPalette={colorPalette}
                                setColorPalette={setColorPalette}
                                updateFormData={updateFormData}
                                onImageUpload={handleImageUpload}
                                onLanguageChange={handleLanguageChange}
                                onAddLanguage={addLanguage}
                                onRemoveLanguage={removeLanguage}
                                LANGUAGE_OPTIONS={LANGUAGE_OPTIONS}
                                toast={toast}
                            />
                        )}
                        {activeTab === 'preview' && (
                            <div className="p-6">
                                <h2 className="text-3xl font-bold mb-6 text-blue-800 border-b-2 border-blue-200 pb-3">
                                    Vista Previa de tu Currículum
                                </h2>
                                
                                {/* Preview usando PDFViewer */}
                                <PDFViewer width="100%" height="500" className="rounded-xl shadow-inner">
                                    <CVPreview formData={formData} colorPalette={colorPalette} />
                                </PDFViewer>
    
                                {/* PDF Download Button with Enhanced Design */}
                                <div className="mt-6 flex justify-center">
                                    <PDFDownloadLink
                                        document={<CVPreview formData={formData} colorPalette={colorPalette} />}
                                        fileName={`CV_${formData.name}_${formData.lastName}.pdf`}
                                        onClick={() => {
                                            toast({
                                                title: "CV Descargado",
                                                description: `CV de ${formData.name} ${formData.lastName} generado con éxito.`,
                                                duration: 3000,
                                            });
                                        }}                                    
                                        className="
                                            flex items-center 
                                            bg-gradient-to-r from-blue-500 to-blue-600 
                                            text-white 
                                            px-8 py-4 
                                            rounded-xl 
                                            shadow-xl 
                                            hover:shadow-2xl 
                                            transition-all 
                                            duration-300 
                                            transform 
                                            hover:-translate-y-1
                                            text-lg
                                            font-semibold
                                        "
                                    >
                                        {({ loading }) => (
                                            loading 
                                                ? 'Generando PDF...' 
                                                : 'Descargar CV en PDF'
                                        )}
                                    </PDFDownloadLink>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
    
                <ToastViewport />
            </div>
        </ToastProvider>
    );
};

export default CVGenerator;