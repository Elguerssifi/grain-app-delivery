// Components/OrderForm/OrderFormClient.tsx
import dynamic from 'next/dynamic';

const OrderForm = dynamic(() => import('./OrderForm'), {
  ssr: false, // Disable server-side rendering for this component
});

export default OrderForm;
