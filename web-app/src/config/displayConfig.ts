

export const displayConfig = {
  columns: [

    {
      key: 'name',
      label: 'Name',
      render: (c: any) => {
        const fullName = [c.firstName,c.middleName, c.lastName].filter(Boolean).join(' ');
        return fullName || '-';
      },
      order: 1
    },
    {
      key: 'dateOfBirth',
      label: 'DOB',
      render: (c: any) => c.dateOfBirth || '-',
      order: 2
    },
    {
      key: 'primaryPhone',
      label: 'Primary Phone',
      render: (c: any) => c.phones?.find((p: any) => p.isPrimary)?.number || '-',
      order: 3
    },
    {
      key: 'primaryEmail',
      label: 'Primary Email',
      render: (c: any) => c.emails?.find((e: any) => e.isPrimary)?.address || '-',
      order: 4
    }


  ]
};
