import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();
  const body = JSON.parse(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;
      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return new Response('', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

async function handleUserCreated(userData: any) {
  const user = {
    id: userData.id,
    email: userData.email_addresses?.[0]?.email_address || '',
    username: userData.username || undefined,
    firstName: userData.first_name || undefined,
    lastName: userData.last_name || undefined,
    imageUrl: userData.image_url || undefined,
    emailVerified:
      userData.email_addresses?.[0]?.verification?.status === 'verified',
    lastSignInAt: userData.last_sign_in_at
      ? new Date(userData.last_sign_in_at)
      : undefined,
  };

  // Filter out undefined values
  const createData: any = {
    id: user.id,
    email: user.email,
    emailVerified: user.emailVerified,
  };

  if (user.username) createData.username = user.username;
  if (user.firstName) createData.firstName = user.firstName;
  if (user.lastName) createData.lastName = user.lastName;
  if (user.imageUrl) createData.imageUrl = user.imageUrl;
  if (user.lastSignInAt) createData.lastSignInAt = user.lastSignInAt;

  await prisma.user.create({
    data: createData,
  });

  console.log(`User ${userData.id} created in database`);
}

async function handleUserUpdated(userData: any) {
  const updateData: any = {
    email: userData.email_addresses?.[0]?.email_address || '',
    emailVerified:
      userData.email_addresses?.[0]?.verification?.status === 'verified',
    updatedAt: new Date(),
  };

  if (userData.username) updateData.username = userData.username;
  if (userData.first_name) updateData.firstName = userData.first_name;
  if (userData.last_name) updateData.lastName = userData.last_name;
  if (userData.image_url) updateData.imageUrl = userData.image_url;
  if (userData.last_sign_in_at)
    updateData.lastSignInAt = new Date(userData.last_sign_in_at);

  await prisma.user.update({
    where: { id: userData.id },
    data: updateData,
  });

  console.log(`User ${userData.id} updated in database`);
}

async function handleUserDeleted(userData: any) {
  await prisma.user.delete({
    where: { id: userData.id },
  });

  console.log(`User ${userData.id} deleted from database`);
}
