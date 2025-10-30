// src/mocks/handlers.js
import { http } from 'msw';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Editor' },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'Admin' },
];

export const handlers = [
  // Handler untuk Login
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    if (email === 'admin@example.com' && password === 'password') {
      return Response.json({
        user: { id: 1, name: 'Admin User', email, role: 'Admin' },
        token: 'fake-jwt-token-for-admin',
      });
    }
    if (email === 'editor@example.com' && password === 'password') {
      return Response.json({
        user: { id: 2, name: 'Editor User', email, role: 'Editor' },
        token: 'fake-jwt-token-for-editor',
      });
    }
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  // Handler untuk mendapatkan data analytics
  http.get('/api/analytics', () => {
    return Response.json({
      totalUsers: users.length,
      totalRevenue: 125430,
      growth: 12.5,
      userGrowthData: [
        { name: 'Jan', users: 400 }, { name: 'Feb', users: 300 }, { name: 'Mar', users: 600 }, { name: 'Apr', users: 800 }, { name: 'May', users: 500 },
      ],
      revenueData: [
        { name: 'Product A', value: 4000 }, { name: 'Product B', value: 3000 }, { name: 'Product C', value: 2000 }, { name: 'Product D', value: 2780 },
      ],
      trafficSource: [
        { name: 'Direct', value: 335, fill: '#8884d8' }, { name: 'Social', value: 234, fill: '#83a6ed' }, { name: 'Referral', value: 154, fill: '#8dd1e1' }, { name: 'Organic', value: 135, fill: '#82ca9d' },
      ],
    });
  }),

  // Handler CRUD untuk Users
  http.get('/api/users', () => {
    return Response.json(users);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = { id: Date.now(), ...(await request.json()) };
    users.push(newUser);
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),

  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedUser = await request.json();
    const userIndex = users.findIndex((u) => u.id == id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      return Response.json(users[userIndex]);
    }
    return new Response(null, { status: 404 });
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params;
    const userIndex = users.findIndex((u) => u.id == id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return new Response(null, { status: 204 });
    }
    return new Response(null, { status: 404 });
  }),
];