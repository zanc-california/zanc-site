import prisma from '../prisma';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service key for admin operations
);

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    // Admin user details
    const adminEmail = 'admin@zanc.org'; // Change this to your desired admin email
    const adminPassword = 'AdminPassword123!'; // Change this to a secure password
    const adminName = 'ZANC Admin';
    
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: adminName,
        role: 'admin'
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    console.log('Auth user created:', authData.user?.id);

    // Create user in your database
    const user = await prisma.user.create({
      data: {
        id: authData.user!.id,
        email: adminEmail,
        name: adminName,
        role: 'ADMIN',
      },
    });

    console.log('Database user created:', user.id);
    console.log('Admin user created successfully!');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('Please change the password after first login!');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createAdminUser();
