import { Document, Page, Text, View, StyleSheet, Image, Link, Svg, Path, Rect, 
    Circle, 
    Line, 
    Polyline   } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

    const MapPinIcon = ({ size = 12, color = '#6B7280' }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <Circle cx="12" cy="10" r="3" />
    </Svg>
    );

    MapPinIcon.propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    const PhoneIcon = ({ size = 12, color = '#6B7280' }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </Svg>
    );

    PhoneIcon.propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    const MailIcon = ({ size = 12, color = '#6B7280' }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <Polyline points="22,6 12,13 2,6" />
        </Svg>
    );

    MailIcon.propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    const LinkedInIcon = ({ size = 15, color = '#0077B5' }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <Rect x="2" y="9" width="4" height="12" />
            <Circle cx="4" cy="4" r="2" />
        </Svg>
    );

    LinkedInIcon.propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    const GitHubIcon = ({ size = 15, color = '#333' }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </Svg>
    );

    GitHubIcon.propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    const WebsiteIcon = ({ size = 15, color = '#333' }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Circle cx="12" cy="12" r="10" />
            <Line x1="2" y1="12" x2="22" y2="12" />
            <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </Svg>
    );

    WebsiteIcon.propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

const CVPreview = ({ formData, colorPalette }) => {
    
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 20,
            paddingRight: 20,
            lineHeight: 1.5,
        },
        header: {
            backgroundColor: colorPalette.headerBg || '#E6F2FF',
            flexDirection: 'row',
            marginBottom: 16,
            padding: 8,
            borderTopLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            alignItems: 'center',
        },
        profileImage: {
            width: 90,
            height: 90,
            borderRadius: 9999,
            marginRight: 24,
            objectFit: 'cover',
        },
        name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 5,
        },
        title: {
            fontSize: 15,
            color: '#4B5563',
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
            justifyContent: 'center',
            color: '#374151',
            gap: 8,
        },
        contactIcon: {
            marginRight: 8,
            color: '#6B7280',
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            borderBottomWidth: 2,
            borderBottomColor: colorPalette.divider || '#CCCCCC',
            paddingBottom: 4,
            marginBottom: 10,
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
            marginBottom: 2,
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
            alignItems: 'center',
            gap: 16,
        },
        socialLinkContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        socialLinkText: {
            marginRight: 8,
            color: '#374151',
            fontFamily: 'FontAwesome', 
            fontSize: 12
        },
    });

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
                        <MapPinIcon />
                        <View style={{ paddingTop:'3px' }}>
                            <Text> {formData.contact.location}</Text>
                        </View>
                    </View>
                    <View style={styles.contactItem}>
                        <PhoneIcon />
                        <View style={{paddingTop:'5px' }}>
                            <Text> {formData.contact.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.contactItem}>
                        <MailIcon/>
                        <View style={{ paddingTop:'3px' }}>
                            <Text> {formData.contact.email}</Text>
                        </View>
                    </View>
                </View>

                {/* Grid Layout */}
                <View style={styles.grid}>
                    {/* Left Column */}
                    <View style={styles.leftColumn}>
                        {/* Summary */}
                        <View>
                            <Text style={styles.sectionTitle}>Resumen</Text>
                            <Text style={{fontSize: 10}}>{formData.summary}</Text>
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
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sectionTitle}>Links</Text>
                            <View style={styles.socialLinks}>
                                {formData.contact.linkedin && (
                                    <Link src={formData.contact.linkedin}>
                                        <LinkedInIcon />
                                    </Link>
                                )}
                                {formData.contact.github && (
                                    <Link src={formData.contact.github}>
                                        <GitHubIcon />
                                    </Link>
                                )}
                                {formData.contact.portfolio && (
                                    <Link src={formData.contact.portfolio}>
                                        <WebsiteIcon />
                                    </Link>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* Right Column */}
                    <View style={styles.rightColumn}>
                        {/* Education */}
                        <View>
                            <Text style={styles.sectionTitle}>Formación Académica</Text>
                            {formData.education.map((edu, index) => (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}>{edu.degree}</Text>
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
                                    <Text style={{ fontWeight: 'bold',fontSize: 14, marginBottom: 4 }}>{job.company}</Text>
                                    <Text style={{ color: '#666666' }}>{job.period}</Text>
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
        profileImage: '/foto-perfil.jpeg',
        name: '',
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

export default CVPreview;