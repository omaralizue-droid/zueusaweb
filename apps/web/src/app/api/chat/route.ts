export async function POST(request: Request) {
  const body = await request.json();
  const { messages } = body;

  const systemMessage = {
    role: 'system',
    content: `You are ZUE's intelligent business assistant. ZUE is a leading Business Process Outsourcing (BPO) company dedicated to driving operational excellence for companies across the United States.

Key facts about ZUE:
- Specializes in Healthcare, Real Estate, Law Firms, Technology, and Service Industries
- Offers offshore remote talent and outsourcing solutions
- Headquartered in Washington DC, USA with regional offices in Karachi, Pakistan and Manila, Philippines
- Contact: +92 2133329280 | careers@zueusa.com
- Group companies include: CPCG, Dermmotion, NHMS, Sasy, SSK, UbeXii, Truly Women, Cliff Camel

Services include: Medical billing, patient support, admin tasks, lead handling, virtual assistants, listing support, legal research, document management, help desk, data handling, customer service.

Process: Understanding Needs → Custom-Built Teams → Technology-Driven Operations → Ongoing Optimization

Be concise, professional, and helpful. Guide users toward learning more about ZUE's services or contacting the team.`,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CREATE_BASE_URL}/integrations/anthropic-claude-opus-4-1/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ANYTHING_PROJECT_TOKEN}`,
        },
        body: JSON.stringify({
          messages: [systemMessage, ...messages],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Integration error: ${response.status}`);
    }

    const data = await response.json();
    const content =
      data.choices?.[0]?.message?.content ?? "I'm sorry, I couldn't process that request.";

    return Response.json({ message: content });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
