import React from 'react';

const Page = ({ params }: { params: { id: string } }) => {
  
  
  return (
    <div>
      Page ID: {params.id}
    </div>
  );
};

export default Page;
