import { NextResponse } from 'next/server';

// Bu endpoint contact form'dan gelen verileri işler
// Gerçek bir email servisi entegre etmek için bu dosyayı güncelleyin

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, projectSummary, timeline, budget } = body;

    // Burada email gönderme servisi entegre edilebilir
    // Örnek: Resend, SendGrid, Nodemailer, vb.
    
    // Şimdilik sadece logluyoruz
    console.log('Contact form submission:', {
      name,
      company,
      email,
      projectSummary,
      timeline,
      budget,
    });

    // TODO: Email servisi entegrasyonu
    // Örnek Resend kullanımı:
    // await resend.emails.send({
    //   from: 'noreply@sentasmuhendislik.com',
    //   to: 'info@sentasmuhendislik.com',
    //   subject: 'Yeni İletişim Formu',
    //   html: `...`
    // });

    return NextResponse.json(
      { success: true, message: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
