export const messageTemplate= `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  
</head>
<body style="font-family: Arial, sans-serif; background-color: #f5f7fa; margin: 0; padding: 0;">
  <table width="100%" bgcolor="#f5f7fa" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;  padding: 44px;">
    <!-- Header -->
    <tr>
    <td>

    <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-bottom: 8px solid #3b82f6;">
    <tr>
      <td align="center" valign="middle" >
        <a href="http://www.gsacademy.com.np">
          <img src="https://res.cloudinary.com/dcozsz33j/image/upload/v1715322929/Untitled_design_ifpkng.jpg" alt="Logo" width="256" height="112">
        </a>
      </td>
    </tr>
    <tr>
    <td align="center" valign="top" style=" font-size: 10px; color: #4b5563;">
      <div style="display: flex; justify-content: space-between; padding-left: 8px; padding-right: 28px; ">
        <a href="tel:+9771234567" style="color: #4b5563; text-decoration: none;">+977 0123456789</a>
        <a href="mailto:goldenacademy@gmail.com" style="color: #4b5563; text-decoration: none; margin-left: auto;">goldenacademy@gmail.com</a>
        <a href="https://www.facebook.com/profile.php?id=100045764452801" style="color: #4b5563; text-decoration: none; margin-left: auto;">
          <img src="https://res.cloudinary.com/dcozsz33j/image/upload/v1715187709/facebook_ccdonq.png" alt="Facebook" style="height: 16px;">
        </a>
      </div>
    </td>
  </tr>
  </table>
  
  
    </td>
  </tr>
  
    <!-- Message Body -->
    <tr>
      <td>
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 16px;">
              <div style="padding-left: 16px; margin-left: 8px; margin-right: 20px;">
                <div>
                  <p style="font-size: 14px; color: #9ca3af; margin-left: 12px;">{currentDate}</p>
                </div>
                <div style="padding-left: 16px;">
                  <h3 style="font-size: 18px; font-weight: bold; color: #3b82f6;">Dear {firstName},</h3>
                  <p style="font-size: 14px; color: #4b5563; margin-top: 8px; white-space: pre-wrap;">{messagebody}
                  </p>
                  <p style="margin-top: 16px; color: #4b5563;">Sincerely,</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td>
        <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); border-top: 8px solid #3b82f6;">
          <tr>
            <td style="padding: 0, 0, 16px, 8px;">
              <div style="background-color: #ffffff;  display: flex;">
                <div style="margin-left: 8px; padding-left: 8px;">
                <a>
                  <img src="https://res.cloudinary.com/dcozsz33j/image/upload/v1715187710/me_ogjzmn.png" alt="Avatar" style="width: 112px; height: 112px; border-radius: 50%;">
              </a>
                  </div>
                <div >
                  <h3 style="font-size: 14px; margin-bottom: 0; font-weight: bold; margin-top: 8px; ">Bhuwan Shrestha</h3>
                  <p style="font-size: 12px; color: #4b5563;  margin-bottom: 0; margin-top: 0;">Communication Coordinator</p>
                  <p style="font-size: 12px; color: #4b5563;  margin-bottom: 0; margin-top: 0;"><a href="tel:+977123456789" style="color: #4b5563;">+ (977) 123 456 789</a></p>
                  <p style="font-size: 12px; color: #4b5563;  margin-bottom: 0; margin-top: 0;">Chapakot-8, Damachour, Syangja, Nepal</p>
                  <p style="border-bottom: 2px solid #ffb800;  margin-bottom: 0; margin-top: 0"> </p>

                  <div style="  background-color: #ffffff; padding-bottom: 16px; margin-top: 0;">
               
                  <a href="http://www.gscademy.com.np" style="color: #3b82f6; text-decoration: underline; margin-left: 96px;">www.gsacademy.com.np</a>
                  
                </div>
                </div>
              </div>
             
              
            </td>
          </tr>
        </table>
      </td>
      
    </tr>
    

    <!-- note -->
    <tr>
      <Td>
        <table  width="100%" cellpadding="0" cellspacing="0" >
          <tr>
            <td>
              <p style=" font-size: 0.6rem; color: #4b5563;">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future. Any Attached document is Solely proprietary entity of Golden Supervision Academy so please delete it ASAP.</p>

            </td>
          </tr>

        </table>
      </Td>
    </tr>
  </table>
</body>
</html>




`;
