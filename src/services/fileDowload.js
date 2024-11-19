export const fileDowload = (data, headers, filename = 'export.csv') => {
    const csvContent = [
      headers.join(','), 
      ...data.map(row => row.join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };