import { useState,useEffect } from 'react';
import {Edit, Eye} from 'lucide-react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
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
    { language: 'Inglés', level: 'B1' },
    { language: 'Inglés', level: 'B2' },
    { language: 'Inglés', level: 'C1' },
    { language: 'Español', level: 'Nativo' },
    { language: 'Portugués', level: 'A2' }
];

const CVGenerator = () => {
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
      setFormData(prev => ({
        ...prev,
        profileImage: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

useEffect(() => {
    const savedCV = localStorage.getItem('savedCV');
    if (savedCV) {
      setFormData(JSON.parse(savedCV));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Tab Selector */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1 shadow-sm">
            <button 
                onClick={() => setActiveTab('edit')}
                className={`
                    flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-300 
                    ${activeTab === 'edit' 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-200'}
                `}
            >
                <Edit className="mr-2" size={20} />
                Editar Currículum
            </button>
            <button 
                onClick={() => setActiveTab('preview')}
                className={`
                    flex-1 flex items-center justify-center py-3 rounded-lg transition-all duration-300
                    ${activeTab === 'preview' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-200'}
                `}
            >
                <Eye className="mr-2" size={20} />
                Vista Previa
            </button>
        </div>

        {/* Formulario de Edición */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {activeTab === 'edit' && (
    <CVForm 
        formData={formData} 
        setFormData={setFormData}  // Add this line
        colorPalette={colorPalette}  // Add this line
        setColorPalette={setColorPalette}  // Add this line
        onSave={() => {
            // Implement save functionality, e.g., saving to localStorage
            localStorage.setItem('savedCV', JSON.stringify(formData));
        }}  // Add this line
        onImageUpload={handleImageUpload}
        onLanguageChange={handleLanguageChange}
        onAddLanguage={addLanguage}
        onRemoveLanguage={removeLanguage}
        languageOptions={LANGUAGE_OPTIONS}
    />
)}
        {activeTab === 'preview' && (
                <div className="sticky top-4 p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                        Vista Previa
                    </h2>
                    
                    {/* Preview usando PDFViewer (opcional) */}
                    <PDFViewer width="100%" height="500">
                        <CVPreview formData={formData} colorPalette={colorPalette} />
                    </PDFViewer>

                    {/* Botón de descarga de PDF */}
                    <div className="mt-6 flex justify-center">
                        <PDFDownloadLink
                            document={<CVPreview formData={formData} colorPalette={colorPalette} />}
                            fileName={`CV_${formData.name}_${formData.lastName}.pdf`}
                            className="
                                flex items-center 
                                bg-gradient-to-r from-blue-500 to-blue-600 
                                text-white 
                                px-6 py-3 
                                rounded-lg 
                                shadow-md 
                                hover:shadow-xl 
                                transition-all 
                                duration-300 
                                transform 
                                hover:-translate-y-1
                            "
                        >
                            {({ loading }) => (
                                loading 
                                    ? 'Generando PDF...' 
                                    : 'Descargar PDF'
                            )}
                        </PDFDownloadLink>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default CVGenerator;