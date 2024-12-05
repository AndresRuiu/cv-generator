import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { Github, Linkedin, Globe, MapPin, Phone, Mail } from 'lucide-react';

const CVPreview = ({ formData, colorPalette }) => {
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Arial',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 60,
            paddingRight: 60,
            lineHeight: 1.5,
        },
        header: {
            backgroundColor: colorPalette.headerBg || '#E6F2FF',
            flexDirection: 'row',
            marginBottom: 24,
            padding: 16,
            borderTopLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            alignItems: 'center',
        },
        profileImage: {
            width: 128,
            height: 128,
            borderRadius: 9999,
            marginRight: 24,
            objectFit: 'cover',
        },
        name: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 5,
        },
        title: {
            fontSize: 20,
            color: '#4B5563',
            textTransform: 'uppercase',
            letterSpacing: 1,
        },
        contactSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 24,
            backgroundColor: colorPalette.contactBg || '#F0F8FF',
            padding: 12,
            borderRadius: 8,
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'center',
            color: '#374151',
        },
        contactIcon: {
            marginRight: 8,
            color: '#6B7280',
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            borderBottomWidth: 2,
            borderBottomColor: colorPalette.divider || '#CCCCCC',
            paddingBottom: 8,
            marginBottom: 12,
        },
        grid: {
            flexDirection: 'row',
        },
        leftColumn: {
            width: '35%',
            paddingRight: 24,
        },
        rightColumn: {
            width: '65%',
        },
        summary: {
            fontSize: 12,
        },
        listItem: {
            fontSize: 12,
            marginBottom: 5,
        },
        educationItem: {
            marginBottom: 16,
        },
        educationDegree: {
            fontWeight: 'bold',
            color: '#1F2937',
        },
        educationInstitution: {
            color: '#4B5563',
        },
        educationPeriod: {
            fontSize: 12,
            color: '#6B7280',
        },
        workExperienceItem: {
            marginBottom: 16,
        },
        workCompany: {
            fontWeight: 'bold',
            color: '#1F2937',
        },
        workPeriod: {
            color: '#4B5563',
        },
        socialLinks: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 16,
            marginTop: 12,
        },
        socialLinkContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        socialLinkText: {
            marginLeft: 8,
            color: '#374151',
        },
    });

    CVPreview.propTypes = {
        formData: PropTypes.shape({
            profileImage: PropTypes.string,
            name: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            contact: PropTypes.shape({
                location: PropTypes.string.isRequired,
                phone: PropTypes.string.isRequired,
                email: PropTypes.string.isRequired,
                linkedin: PropTypes.string,
                github: PropTypes.string,
                portfolio: PropTypes.string
            }).isRequired,
            summary: PropTypes.string.isRequired,
            skills: PropTypes.arrayOf(PropTypes.string).isRequired,
            education: PropTypes.arrayOf(PropTypes.shape({
                degree: PropTypes.string.isRequired,
                institution: PropTypes.string.isRequired,
                period: PropTypes.string.isRequired
            })).isRequired,
            workExperience: PropTypes.arrayOf(PropTypes.shape({
                company: PropTypes.string.isRequired,
                period: PropTypes.string.isRequired,
                roles: PropTypes.arrayOf(PropTypes.string).isRequired
            })).isRequired,
            languages: PropTypes.arrayOf(PropTypes.shape({
                language: PropTypes.string.isRequired,
                level: PropTypes.string.isRequired
            })).isRequired
        }).isRequired,
        colorPalette: PropTypes.shape({
            headerBg: PropTypes.string,
            contactBg: PropTypes.string,
            name: PropTypes.string,
            divider: PropTypes.string
        }).isRequired
    };

    CVPreview.defaultProps = {
        formData: {
            profileImage: null,
            name: 'Andres',
            lastName: '',
            title: '',
            contact: {
                location: '',
                phone: '',
                email: '',
                linkedin: '',
                github: '',
                portfolio: ''
            },
            summary: '',
            skills: [],
            education: [],
            workExperience: [],
            languages: []
        },
        colorPalette: {
            headerBg: '#E6F2FF',
            contactBg: '#F0F8FF',
            divider: '#CCCCCC',
            name: 'Default'
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    {formData.profileImage ? (
                        <Image src={formData.profileImage} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileImage} />
                    )}
                    <View>
                        <Text style={styles.name}>{formData.name} {formData.lastName}</Text>
                        <Text style={styles.title}>{formData.title}</Text>
                    </View>
                </View>

                {/* Contact Info */}
                <View style={styles.contactSection}>
                    <View style={styles.contactItem}>
                        <Text><MapPin size={12} /> {formData.contact.location}</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text><Phone size={12} /> {formData.contact.phone}</Text>
                    </View>
                    <View style={styles.contactItem}>
                        <Text><Mail size={12} /> {formData.contact.email}</Text>
                    </View>
                </View>

                {/* Grid Layout */}
                <View style={styles.grid}>
                    {/* Left Column */}
                    <View style={styles.leftColumn}>
                        {/* Summary */}
                        <View>
                            <Text style={styles.sectionTitle}>Resumen</Text>
                            <Text>{formData.summary}</Text>
                        </View>

                        {/* Skills */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sectionTitle}>Conocimientos</Text>
                            {formData.skills.map((skill, index) => (
                                <Text key={index} style={styles.listItem}>• {skill}</Text>
                            ))}
                        </View>

                        {/* Languages */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sectionTitle}>Idiomas</Text>
                            {formData.languages.map((lang, index) => (
                                <Text key={index} style={styles.listItem}>
                                    {lang.language} - {lang.level}
                                </Text>
                            ))}
                        </View>

                        {/* Social Links */}
                        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                            <Text style={styles.sectionTitle}>Links</Text>
                            {formData.contact.linkedin && (
                                <Link src={formData.contact.linkedin}>
                                    <View style={styles.socialLinkContainer}>
                                        <Linkedin size={12} color="#0A66C2" />
                                        <Text style={styles.socialLinkText}>LinkedIn</Text>
                                    </View>
                                </Link>
                            )}
                            {formData.contact.github && (
                                <Link src={formData.contact.github}>
                                    <View style={styles.socialLinkContainer}>
                                        <Github size={12} color="#181717" />
                                        <Text style={styles.socialLinkText}>GitHub</Text>
                                    </View>
                                </Link>
                            )}
                            {formData.contact.portfolio && (
                                <Link src={formData.contact.portfolio}>
                                    <View style={styles.socialLinkContainer}>
                                        <Globe size={12} color="#4285F4" />
                                        <Text style={styles.socialLinkText}>Portafolio</Text>
                                    </View>
                                </Link>
                            )}
                        </View>
                    </View>

                    {/* Right Column */}
                    <View style={styles.rightColumn}>
                        {/* Education */}
                        <View>
                            <Text style={styles.sectionTitle}>Formación Académica</Text>
                            {formData.education.map((edu, index) => (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                                    <Text>{edu.institution}</Text>
                                    <Text style={{ color: '#666666' }}>{edu.period}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Work Experience */}
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
                            {formData.workExperience.map((job, index) => (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{job.company}</Text>
                                    <Text>{job.period}</Text>
                                    {job.roles.map((role, roleIndex) => (
                                        <Text key={roleIndex} style={styles.listItem}>• {role}</Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default CVPreview;