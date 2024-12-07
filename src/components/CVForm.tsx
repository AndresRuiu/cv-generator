import{ useState} from 'react';
import { Palette } from 'lucide-react';

interface ColorPalette {
    name: string;
    headerBg: string;
    contactBg: string;
    divider: string;
}

interface ContactInfo {
    location: string;
    phone: string;
    email: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
}

interface EducationEntry {
    degree: string;
    institution: string;
    period: string;
}

interface WorkExperienceEntry {
    company: string;
    period: string;
    roles: string[];
}

interface LanguageEntry {
    language: string;
    level: string;
}

interface FormData {
    profileImage: string | null;
    name: string;
    lastName: string;
    title: string;
    contact: ContactInfo;
    summary: string;
    skills: string[];
    education: EducationEntry[];
    workExperience: WorkExperienceEntry[];
    languages: LanguageEntry[];
}

// Constants
const COLOR_PALETTES: ColorPalette[] = [
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

// Component Props Interface
interface CVFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    colorPalette: ColorPalette;
    setColorPalette: React.Dispatch<React.SetStateAction<ColorPalette>>;
    onSave: () => void;
}

const CVForm: React.FC<CVFormProps> = ({ 
    formData, 
    setFormData, 
    colorPalette, 
    setColorPalette, 
    onSave 
}) => {
    const [showColorPalette, setShowColorPalette] = useState(false);

    const handleLanguageChange = (index: number, field: keyof LanguageEntry, value: string) => {
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

    const removeLanguage = (index: number) => {
        if (formData.languages.length > 1) {
            const newLanguages = formData.languages.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, languages: newLanguages }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profileImage: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const resetToDefault = () => {
        setFormData({
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
                'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express.js',
                'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'Kubernetes', 'AWS'
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
    };

    return (
        <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                            Personaliza tu Currículum
                        </h2>
        
        <div className="space-y-6">
        {/* Imagen de Perfil */}
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Imagen de Perfil</label>
            <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
        </div>

        {/* Datos Personales */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombres</label>
                <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Apellidos</label>
                <input 
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Título Profesional</label>
                <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            </div>
        </div>

        {/* Información de Contacto */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                <input 
                type="text"
                value={formData.contact.location}
                onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    contact: {...prev.contact, location: e.target.value}
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input 
                type="tel"
                value={formData.contact.phone}
                onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    contact: {...prev.contact, phone: e.target.value}
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    contact: {...prev.contact, email: e.target.value}
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            </div>
        </div>

        {/* Redes Sociales */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input 
                type="url"
                value={formData.contact.linkedin}
                onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    contact: {...prev.contact, linkedin: e.target.value}
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input 
                type="url"
                value={formData.contact.github}
                onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    contact: {...prev.contact, github: e.target.value}
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                <input 
                type="url"
                value={formData.contact.portfolio}
                onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    contact: {...prev.contact, portfolio: e.target.value}
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            </div>
        </div>

        {/* Resumen */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Resumen Profesional</h3>
            <textarea 
            value={formData.summary}
            onChange={(e) => setFormData(prev => ({...prev, summary: e.target.value}))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 h-24"
            placeholder="Escribe un breve resumen sobre tu perfil profesional"
            />
        </div>

        {/* Habilidades */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
            {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
                <input 
                type="text"
                value={skill}
                onChange={(e) => {
                    const newSkills = [...formData.skills];
                    newSkills[index] = e.target.value;
                    setFormData(prev => ({...prev, skills: newSkills}));
                }}
                className="flex-grow mr-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button 
                onClick={() => {
                    const newSkills = formData.skills.filter((_, i) => i !== index);
                    setFormData(prev => ({...prev, skills: newSkills}));
                }}
                className="bg-red-500 text-white px-2 py-1 rounded"
                >
                Eliminar
                </button>
            </div>
            ))}
            <button 
            onClick={() => setFormData(prev => ({
                ...prev, 
                skills: [...prev.skills, 'Nueva Habilidad']
            }))}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
            Agregar Habilidad
            </button>
        </div>

        {/* Formación Académica */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Formación Académica</h3>
            {formData.education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 bg-white rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input 
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].degree = e.target.value;
                        setFormData(prev => ({...prev, education: newEducation}));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Institución</label>
                    <input 
                    type="text"
                    value={edu.institution}
                    onChange={(e) => {
                        const newEducation = [...formData.education];
                        newEducation[index].institution = e.target.value;
                        setFormData(prev => ({...prev, education: newEducation}));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                </div>
                <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Período</label>
                <input 
                    type="text"
                    value={edu.period}
                    onChange={(e) => {
                    const newEducation = [...formData.education];
                    newEducation[index].period = e.target.value;
                    setFormData(prev => ({...prev, education: newEducation}));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                </div>
                {formData.education.length > 1 && (
                <button 
                    onClick={() => {
                    const newEducation = formData.education.filter((_, i) => i !== index);
                    setFormData(prev => ({...prev, education: newEducation}));
                    }}
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                    Eliminar
                </button>
                )}
            </div>
            ))}
            <button 
            onClick={() => setFormData(prev => ({
                ...prev, 
                education: [...prev.education, {
                degree: 'Nuevo Título',
                institution: 'Nueva Institución',
                period: 'Período'
                }]
            }))}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
            Agregar Formación
            </button>
        </div>

        {/* Experiencia Laboral */}
        <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Experiencia Laboral</h3>
            {formData.workExperience.map((job, index) => (
            <div key={index} className="mb-4 p-3 bg-white rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Empresa</label>
                    <input 
                    type="text"
                    value={job.company}
                    onChange={(e) => {
                        const newWorkExperience = [...formData.workExperience];
                        newWorkExperience[index].company = e.target.value;
                        setFormData(prev => ({...prev, workExperience: newWorkExperience}));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Período</label>
                    <input 
                    type="text"
                    value={job.period}
                    onChange={(e) => {
                        const newWorkExperience = [...formData.workExperience];
                        newWorkExperience[index].period = e.target.value;
                        setFormData(prev => ({...prev, workExperience: newWorkExperience}));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                </div>
                <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Roles y Responsabilidades</label>
                {job.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="flex items-center mb-2">
                    <input 
                        type="text"
                        value={role}
                        onChange={(e) => {
                        const newWorkExperience = [...formData.workExperience];
                        newWorkExperience[index].roles[roleIndex] = e.target.value;
                        setFormData(prev => ({...prev, workExperience: newWorkExperience}));
                        }}
                        className="flex-grow mr-2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <button 
                        onClick={() => {
                        const newWorkExperience = [...formData.workExperience];
                        newWorkExperience[index].roles = newWorkExperience[index].roles.filter((_, i) => i !== roleIndex);
                        setFormData(prev => ({...prev, workExperience: newWorkExperience}));
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Eliminar
                    </button>
                    </div>
                ))}
                <button 
                    onClick={() => {
                        const newWorkExperience = [...formData.workExperience];
                        newWorkExperience[index].roles.push('Nuevo Rol');
                        setFormData(prev => ({...prev, workExperience: newWorkExperience}));
                    }}
                    className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
                    >
                    Agregar Rol
                    </button>
                </div>
                
                {formData.workExperience.length > 1 && (
                    <button 
                    onClick={() => {
                        const newWorkExperience = formData.workExperience.filter((_, i) => i !== index);
                        setFormData(prev => ({...prev, workExperience: newWorkExperience}));
                    }}
                    className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                    >
                    Eliminar Experiencia
                    </button>
                )}
                </div>
            ))}
            
            <button 
                onClick={() => setFormData(prev => ({
                ...prev, 
                workExperience: [...prev.workExperience, {
                    company: 'Nueva Empresa',
                    period: 'Período',
                    roles: ['Nuevo Rol']
                }]
                }))}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
                Agregar Experiencia Laboral
            </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Idiomas</h3>
                                {formData.languages.map((lang, index) => (
                                    <div key={index} className="flex items-center mb-2 space-x-2">
                                        <select
                                            value={lang.language}
                                            onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                                            className="flex-grow mr-2 block rounded-md border-gray-300 shadow-sm"
                                        >
                                            {LANGUAGE_OPTIONS.map((option, optIndex) => (
                                                <option key={optIndex} value={option.language}>
                                                    {option.language}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={lang.level}
                                            onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                                            className="flex-grow mr-2 block rounded-md border-gray-300 shadow-sm"
                                        >
                                            {[...new Set(LANGUAGE_OPTIONS.map(opt => opt.level))].map((level, levelIndex) => (
                                                <option key={levelIndex} value={level}>
                                                    {level}
                                                </option>
                                            ))}
                                        </select>
                                        {formData.languages.length > 1 && (
                                            <button 
                                                onClick={() => removeLanguage(index)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button 
                                    onClick={addLanguage}
                                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Agregar Idioma
                                </button>
                            </div>

                {/* Color Palette Section */}
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <h3 className="text-lg font-semibold mb-4">Paleta de Colores</h3>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setShowColorPalette(!showColorPalette)}
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            <Palette className="mr-2" />
                            {showColorPalette ? 'Ocultar Paleta' : 'Seleccionar Color'}
                        </button>
                        <span className="text-gray-600">Color Actual: {colorPalette.name}</span>
                    </div>
                    {showColorPalette && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {COLOR_PALETTES.map((palette, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setColorPalette(palette);
                                        setShowColorPalette(false);
                                    }}
                                    style={{ backgroundColor: palette.headerBg }}
                                    className={`
                                        p-2 rounded 
                                        hover:border-2 hover:border-blue-500
                                    `}
                                >
                                    {palette.name}
                                </button>                                        
                            ))}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button 
                        onClick={resetToDefault}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Restaurar Valores Predeterminados
                    </button>
            
                    <button 
                        onClick={onSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Guardar CV
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CVForm;