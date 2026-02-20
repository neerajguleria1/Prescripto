// Environment variable validation
const requiredEnvVars = [
    'MONGODB_URL',
    'JWT_SECRET',
    'CLOUDINARY_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSSWORD',
    'FRONTEND_URL',
    'ADMIN_URL',
    'REDIS_HOST',
    'REDIS_PORT',
    'REDIS_PASSWORD'
];

export const validateEnv = () => {
    const missing = [];
    const warnings = [];

    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });

    // Validate JWT_SECRET length
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        warnings.push('JWT_SECRET should be at least 32 characters long');
    }

    // Check for default values
    if (process.env.ADMIN_PASSSWORD === 'your_admin_password') {
        warnings.push('ADMIN_PASSSWORD is still set to default value');
    }

    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(varName => console.error(`   - ${varName}`));
        process.exit(1);
    }

    if (warnings.length > 0) {
        console.warn('⚠️  Environment warnings:');
        warnings.forEach(warning => console.warn(`   - ${warning}`));
    }

    console.log('✅ Environment variables validated successfully');
};
