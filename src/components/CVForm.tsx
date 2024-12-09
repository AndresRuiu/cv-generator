import React, { useState } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Palette, Trash2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';

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
    { language: 'Español', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Inglés', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Francés', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Alemán', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Portugués', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Italiano', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Chino', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] },
    { language: 'Ruso', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2','Nativo'] }
];

// Component Props Interface
const CVFormSchema = z.object({
    profileImage: z.string().nullable(),
    name: z.string().min(1, "Nombres es requerido"),
    lastName: z.string().min(1, "Apellidos es requerido"),
    title: z.string().min(1, "Título Profesional es requerido"),
    contact: z.object({
        location: z.string().min(1, "Ubicación es requerida"),
        phone: z.string().min(1, "Teléfono es requerido"),
        email: z.string().email("Email inválido"),
        linkedin: z.string().url("URL de LinkedIn inválida").optional(),
        github: z.string().url("URL de GitHub inválida").optional(),
        portfolio: z.string().url("URL de Portfolio inválida").optional(),
    }),
    summary: z.string().optional(),
    skills: z.array(z.string()).min(1, "Debe tener al menos una habilidad"),
    education: z.array(z.object({
        degree: z.string().min(1, "Título es requerido"),
        institution: z.string().min(1, "Institución es requerida"),
        period: z.string().min(1, "Período es requerido"),
    })),
    workExperience: z.array(z.object({
        company: z.string().min(1, "Empresa es requerida"),
        period: z.string().min(1, "Período es requerido"),
        roles: z.array(z.string()).min(1, "Debe tener al menos un rol"),
    })),
    languages: z.array(z.object({
        language: z.string().min(1, "Idioma es requerido"),
        level: z.string().min(1, "Nivel es requerido"),
    })),
    colorPalette: z.object({
        name: z.string(),
        headerBg: z.string(),
        contactBg: z.string(),
        divider: z.string()
    })
});

type CVFormData = z.infer<typeof CVFormSchema>;

interface CVFormProps {
    initialData?: CVFormData;
    onSave: (data: CVFormData) => void;
    updateFormData?: (path: keyof CVFormData, value: any) => void;
    colorPalette?: ColorPalette;
    setColorPalette?: (palette: ColorPalette) => void;
    onImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    toast?: (options: {
        title: string;
        description: string;
        duration?: number;
    }) => void;
}

const CVForm: React.FC<CVFormProps> = ({ 
    initialData,
    onSave, 
    updateFormData,
    onImageUpload,
    toast
}) => {
    const [showColorPalette, setShowColorPalette] = useState(false);
    const { toast: hookToast } = useToast();
    const showToast = toast || hookToast;

    const form = useForm<CVFormData>({
        resolver: zodResolver(CVFormSchema),
        defaultValues: initialData
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onImageUpload) {
            onImageUpload(e);
        }
    };

    const resetToDefault = () => {
        const defaultData: CVFormData = {
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
            ],
            colorPalette: COLOR_PALETTES[0]
        };

        Object.keys(defaultData).forEach(key => {
            form.setValue(key as keyof CVFormData, defaultData[key as keyof CVFormData]);
        });

        Object.keys(defaultData).forEach(key => {
            form.setValue(key as keyof CVFormData, defaultData[key as keyof CVFormData]);
        });

        // Usa showToast en lugar de toast directamente
        showToast({
            title: "Valores Restablecidos",
            description: "Se han restaurado los valores predeterminados del CV.",
            duration: 3000,
        });
    };

    const onSubmit: SubmitHandler<CVFormData> = (data) => {
        onSave(data);
        showToast({
            title: "CV Guardado",
            description: "Los cambios en tu currículum han sido guardados exitosamente.",
            duration: 3000,
        });
    };
    const handleDirectInputChange = (
        field: keyof CVFormData, 
        value: any
    ) => {
        if (updateFormData) {
            updateFormData(field, value);
        }
        form.setValue(field, value);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    Personaliza tu Currículum
                </h2>
                
                <div className="space-y-6">
                    {/* Imagen de Perfil */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Imagen de Perfil</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="profileImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleImageUpload(e);
                                                field.onChange(e);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
        
                    {/* Datos Personales */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Datos Personales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombres</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('name', e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellidos</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleDirectInputChange('lastName', e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título Profesional</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleDirectInputChange('title', e.target.value);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
        
                    {/* Información de Contacto */}
                    <Card>
                    <CardHeader>
                        <CardTitle>Información de Contacto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="contact.location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ubicación</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="text"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('contact', {
                                                        ...form.getValues('contact'),
                                                        location: e.target.value
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact.phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="tel"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('contact', {
                                                        ...form.getValues('contact'),
                                                        phone: e.target.value
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact.email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="email"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('contact', {
                                                        ...form.getValues('contact'),
                                                        email: e.target.value
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
    
                {/* Redes Sociales */}
                <Card>
                    <CardHeader>
                        <CardTitle>Redes Sociales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="contact.linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="url"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('contact', {
                                                        ...form.getValues('contact'),
                                                        linkedin: e.target.value
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact.github"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GitHub</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="url"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('contact', {
                                                        ...form.getValues('contact'),
                                                        github: e.target.value
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact.portfolio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Portfolio</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                type="url"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDirectInputChange('contact', {
                                                        ...form.getValues('contact'),
                                                        portfolio: e.target.value
                                                    });
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
    
                {/* Resumen */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resumen Profesional</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea 
                                            {...field}
                                            placeholder="Escribe un breve resumen sobre tu perfil profesional"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleDirectInputChange('summary', e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
        
                    {/* Habilidades */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Habilidades</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                    <FormItem>
                                        {field.value.map((skill, index) => (
                                            <div key={index} className="flex items-center mb-2 space-x-2">
                                                <FormControl>
                                                    <Input 
                                                        type="text"
                                                        value={skill}
                                                        onChange={(e) => {
                                                            const newSkills = [...field.value];
                                                            newSkills[index] = e.target.value;
                                                            field.onChange(newSkills);
                                                        }}
                                                    />
                                                </FormControl>
                                                <Button 
                                                    variant="destructive"
                                                    size="icon"
                                                    type="button"
                                                    onClick={() => {
                                                        const newSkills = field.value.filter((_, i) => i !== index);
                                                        field.onChange(newSkills);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button 
                                            type="button"
                                            onClick={() => field.onChange([...field.value, 'Nueva Habilidad'])}
                                            className="mt-2"
                                        >
                                            Agregar Habilidad
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
        
                    {/* Education Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Educación</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="education"
                                render={({ field }) => (
                                    <FormItem>
                                        {field.value.map((edu, index) => (
                                            <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Título"
                                                        value={edu.degree}
                                                        onChange={(e) => {
                                                            const newEducation = [...field.value];
                                                            newEducation[index] = {
                                                                ...newEducation[index],
                                                                degree: e.target.value
                                                            };
                                                            field.onChange(newEducation);
                                                            handleDirectInputChange('education', newEducation);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Institución"
                                                        value={edu.institution}
                                                        onChange={(e) => {
                                                            const newEducation = [...field.value];
                                                            newEducation[index] = {
                                                                ...newEducation[index],
                                                                institution: e.target.value
                                                            };
                                                            field.onChange(newEducation);
                                                            handleDirectInputChange('education', newEducation);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Período"
                                                        value={edu.period}
                                                        onChange={(e) => {
                                                            const newEducation = [...field.value];
                                                            newEducation[index] = {
                                                                ...newEducation[index],
                                                                period: e.target.value
                                                            };
                                                            field.onChange(newEducation);
                                                            handleDirectInputChange('education', newEducation);
                                                        }}
                                                    />
                                                </FormControl>
                                                {field.value.length > 1 && (
                                                    <Button 
                                                        variant="destructive"
                                                        type="button"
                                                        onClick={() => {
                                                            const newEducation = field.value.filter((_, i) => i !== index);
                                                            field.onChange(newEducation);
                                                            handleDirectInputChange('education', newEducation);
                                                        }}
                                                    >
                                                        Eliminar Educación
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button 
                                            type="button"
                                            onClick={() => {
                                                const newEducation = [
                                                    ...field.value, 
                                                    { degree: '', institution: '', period: '' }
                                                ];
                                                field.onChange(newEducation);
                                                handleDirectInputChange('education', newEducation);
                                            }}
                                            className="mt-2"
                                        >
                                            Agregar Educación
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Work Experience Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Experiencia Laboral</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="workExperience"
                                render={({ field }) => (
                                    <FormItem>
                                        {field.value.map((exp, index) => (
                                            <div key={index} className="space-y-2 mb-4 p-4 border rounded">
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Empresa"
                                                        value={exp.company}
                                                        onChange={(e) => {
                                                            const newWorkExperience = [...field.value];
                                                            newWorkExperience[index] = {
                                                                ...newWorkExperience[index],
                                                                company: e.target.value
                                                            };
                                                            field.onChange(newWorkExperience);
                                                            handleDirectInputChange('workExperience', newWorkExperience);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Período"
                                                        value={exp.period}
                                                        onChange={(e) => {
                                                            const newWorkExperience = [...field.value];
                                                            newWorkExperience[index] = {
                                                                ...newWorkExperience[index],
                                                                period: e.target.value
                                                            };
                                                            field.onChange(newWorkExperience);
                                                            handleDirectInputChange('workExperience', newWorkExperience);
                                                        }}
                                                    />
                                                </FormControl>
                                                {exp.roles.map((role, roleIndex) => (
                                                    <div key={roleIndex} className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <Input 
                                                                placeholder="Rol"
                                                                value={role}
                                                                onChange={(e) => {
                                                                    const newWorkExperience = [...field.value];
                                                                    newWorkExperience[index] = {
                                                                        ...newWorkExperience[index],
                                                                        roles: newWorkExperience[index].roles.map((r, rI) => 
                                                                            rI === roleIndex ? e.target.value : r
                                                                        )
                                                                    };
                                                                    field.onChange(newWorkExperience);
                                                                    handleDirectInputChange('workExperience', newWorkExperience);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <Button 
                                                            variant="destructive"
                                                            size="icon"
                                                            type="button"
                                                            onClick={() => {
                                                                const newWorkExperience = [...field.value];
                                                                newWorkExperience[index] = {
                                                                    ...newWorkExperience[index],
                                                                    roles: newWorkExperience[index].roles.filter((_, rI) => rI !== roleIndex)
                                                                };
                                                                field.onChange(newWorkExperience);
                                                                handleDirectInputChange('workExperience', newWorkExperience);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button 
                                                    type="button"
                                                    onClick={() => {
                                                        const newWorkExperience = [...field.value];
                                                        newWorkExperience[index] = {
                                                            ...newWorkExperience[index],
                                                            roles: [...newWorkExperience[index].roles, 'Nuevo Rol']
                                                        };
                                                        field.onChange(newWorkExperience);
                                                        handleDirectInputChange('workExperience', newWorkExperience);
                                                    }}
                                                    className="mt-2"
                                                >
                                                    Agregar Rol
                                                </Button>
                                                {field.value.length > 1 && (
                                                    <Button 
                                                        variant="destructive"
                                                        type="button"
                                                        onClick={() => {
                                                            const newWorkExperience = field.value.filter((_, i) => i !== index);
                                                            field.onChange(newWorkExperience);
                                                            handleDirectInputChange('workExperience', newWorkExperience);
                                                        }}
                                                        className="ml-2"
                                                    >
                                                        Eliminar Experiencia
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button 
                                            type="button"
                                            onClick={() => {
                                                const newWorkExperience = [
                                                    ...field.value, 
                                                    { company: '', period: '', roles: ['Nuevo Rol'] }
                                                ];
                                                field.onChange(newWorkExperience);
                                                handleDirectInputChange('workExperience', newWorkExperience);
                                            }}
                                            className="mt-2"
                                        >
                                            Agregar Experiencia
                                        </Button>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Languages Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Idiomas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="languages"
                                    render={({ field }) => (
                                        <FormItem>
                                            {field.value.map((lang, index) => (
                                                <div 
                                                    key={index} 
                                                    className="flex items-center space-x-2 mb-2"
                                                >
                                                    <FormControl className="flex-grow">
                                                        <Select 
                                                            value={lang.language}
                                                            onValueChange={(value) => {
                                                                const newLanguages = [...field.value];
                                                                const selectedLanguage = LANGUAGE_OPTIONS.find(
                                                                    option => option.language === value
                                                                );
                                                                newLanguages[index] = {
                                                                    language: value, 
                                                                    level: selectedLanguage?.levels[0] || 'A1'
                                                                };
                                                                field.onChange(newLanguages);
                                                                handleDirectInputChange('languages', newLanguages);
                                                            }}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Idioma" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {LANGUAGE_OPTIONS.map((option, optIndex) => (
                                                                    <SelectItem 
                                                                        key={optIndex} 
                                                                        value={option.language}
                                                                    >
                                                                        {option.language}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>

                                                    <FormControl className="flex-grow">
                                                        <Select
                                                            value={lang.level}
                                                            onValueChange={(value) => {
                                                                const newLanguages = [...field.value];
                                                                newLanguages[index].level = value;
                                                                field.onChange(newLanguages);
                                                                handleDirectInputChange('languages', newLanguages);
                                                            }}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Nivel" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {LANGUAGE_OPTIONS
                                                                    .find(opt => opt.language === lang.language)
                                                                    ?.levels.map((level, levelIndex) => (
                                                                        <SelectItem 
                                                                            key={levelIndex} 
                                                                            value={level}
                                                                        >
                                                                            {level}
                                                                        </SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>

                                                    {field.value.length > 1 && (
                                                        <Button 
                                                            variant="destructive"
                                                            size="sm"
                                                            type="button"
                                                            className="p-2"
                                                            onClick={() => {
                                                                const newLanguages = field.value.filter(
                                                                    (_, i) => i !== index
                                                                );
                                                                field.onChange(newLanguages);
                                                                handleDirectInputChange('languages', newLanguages);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            
                                            <Button 
                                                type="button"
                                                onClick={() => {
                                                    const newLanguages = [
                                                        ...field.value, 
                                                        { 
                                                            language: 'Inglés', 
                                                            level: 'A1' 
                                                        }
                                                    ];
                                                    field.onChange(newLanguages);
                                                    handleDirectInputChange('languages', newLanguages);
                                                }}
                                                className="mt-2 w-full"
                                                variant="outline"
                                            >
                                                Agregar Idioma
                                            </Button>
                                            
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
        
                    {/* Color Palette Section */}
                    <Card>
                    <CardHeader>
                        <CardTitle>Paleta de Colores</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2 mb-4">
                            <Button 
                                type="button"
                                onClick={() => setShowColorPalette(!showColorPalette)}
                                variant="outline"
                            >
                                <Palette className="mr-2 h-4 w-4" />
                                {showColorPalette ? 'Ocultar Paleta' : 'Seleccionar Color'}
                            </Button>
                            <span className="text-muted-foreground">
                                Color Actual: {form.watch('colorPalette.name')}
                            </span>
                        </div>
                        {showColorPalette && (
                            <div className="grid grid-cols-3 gap-2">
                                {COLOR_PALETTES.map((palette, index) => (
                                    <Button
                                        key={index}
                                        type="button"
                                        onClick={() => {
                                            form.setValue('colorPalette', palette);
                                            setShowColorPalette(false);
                                        }}
                                        variant="outline"
                                        className="h-16"
                                        style={{ backgroundColor: palette.headerBg }}
                                    >
                                        {palette.name}
                                    </Button>                                        
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
        
                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6">
                        <Button 
                            type="button"
                            onClick={resetToDefault}
                            variant="secondary"
                        >
                            Restaurar Valores Predeterminados
                        </Button>
        
                        <Button 
                            type="submit"
                            variant="default"
                        >
                            Guardar CV
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
        );
};

export default CVForm;