export default async function Dashboard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/stats`);
  const { data } = await res.json();

  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Overview</h1>
        <p>Good morning! Ready to apply for some more jobs?</p>
      </div>
      <div className='flex gap-20 px-20 justify-between'>
        <div className='border border-[#dee2e6] flex-1 bg-white h-64 rounded-lg'>
          <h1>Total Applications</h1>
          <p className='text-primary'>{data.result.total}</p>
        </div>
        <div className='border border-[#dee2e6] flex-1 bg-white rounded-lg'>
          <h1>Interviews Scheduled</h1>
          <p className='text-secondary'>{data.result.interviewing}</p>
        </div>
        <div className='border border-[#dee2e6] flex-1 bg-white rounded-lg'>
          <h1>Offers Received</h1>
          <p className='text-[#1a7a4a]'>{data.result.offer}</p>
        </div>
        <div className='border border-[#dee2e6] flex-1 bg-white rounded-lg'>
          <h1>Rejections</h1>
          <p className='text-error'>{data.result.rejected}</p>
        </div>
      </div>
    </div>
  );
}
