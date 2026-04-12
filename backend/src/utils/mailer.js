const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendResetOtp = async (email, otp) => {
    try {
        const resetLink = `http://localhost:5173/login?mode=otp&email=${encodeURIComponent(email)}`;
        
        const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc; border-radius: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background: linear-gradient(135deg, #22c55e, #0d9488); padding: 15px; border-radius: 16px; margin-bottom: 20px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="color: white;">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                </div>
                <h1 style="color: #0f172a; margin: 0; font-size: 28px;">Password Reset Request</h1>
                <p style="color: #64748b; font-size: 16px; margin-top: 10px;">HealthBuddy Account Security</p>
            </div>
            
            <div style="background-color: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                    We received a request to reset the password for your HealthBuddy account. Use the secure OTP code below to proceed:
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <div style="background-color: #f1f5f9; border: 2px dashed #cbd5e1; display: inline-block; padding: 15px 40px; border-radius: 12px;">
                        <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #0f172a; letter-spacing: 8px;">${otp}</span>
                    </div>
                    <p style="color: #ef4444; font-size: 14px; margin-top: 15px; font-weight: 500;">Valid for exactly 10 minutes</p>
                </div>
                
                <div style="text-align: center; margin-top: 40px;">
                    <a href="${resetLink}" style="background: linear-gradient(135deg, #22c55e, #0d9488); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
                        Verify OTP Now
                    </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 40px 0 20px;" />
                <p style="color: #94a3b8; font-size: 14px; text-align: center; margin: 0;">
                    If you didn't request a password reset, you can safely ignore this email.
                </p>
            </div>
        </div>
        `;

        const data = await resend.emails.send({
            from: 'HealthBuddy Security <onboarding@resend.dev>',
            to: email, 
            subject: 'HealthBuddy - Password Reset OTP',
            html: htmlTemplate
        });

        console.log("Resend OTP sent successfully:", data);
        return data;
    } catch (error) {
        console.error("Error sending Resend OTP email: ", error);
        throw new Error("Could not send OTP email");
    }
};

module.exports = { sendResetOtp };
