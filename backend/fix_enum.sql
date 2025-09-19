-- Add the correct ADMIN value to the Role enum
ALTER TYPE "Role" ADD VALUE 'ADMIN';


-- Update any existing users with old Admin casing
