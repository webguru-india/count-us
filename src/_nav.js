export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Events',
      url: '/events',
      icon: 'icon-calendar',
      children: [
        {
          name: 'Event Listing',
          url: '/events/event-listing',
          icon: 'icon-list',
        },
        {
          name: 'Create Event',
          url: '/events/create-event',
          icon: 'fa fa-calendar-plus-o fa-lg',
        },
        {
          name: 'Add Attendee',
          url: '/events/add-attendee',
          icon: 'icon-user',
        }
      ],
    },
    {
      name: 'QR Code Scanner',
      url: '/qr-code-scanner',
      icon: 'fa fa-qrcode fa-lg',
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      badge: {
        variant: 'info',
        text: '5',
      },
    },
    {
      name: 'Payment History',
      url: '/payment-history',
      icon: 'icon-paypal',
    },
    {
      name: 'Report Charts',
      url: '/report-charts',
      icon: 'icon-chart',
    }
  ]
};
