import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGO_URI = 'mongodb://localhost:27017/europack';

async function resetAdmin() {
  await mongoose.connect(MONGO_URI);
  
  const email = 'admin@europack.in';
  const newPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const result = await mongoose.connection.collection('users').updateOne(
    { email: email },
    { $set: { password: hashedPassword } }
  );

  if (result.modifiedCount > 0) {
    console.log(`Success! Password for ${email} is now: admin123`);
  } else {
    console.log("Error: User not found or password already matches.");
  }
  
  process.exit();
}

resetAdmin();
