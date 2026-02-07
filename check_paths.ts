import { allBlogs } from './.contentlayer/generated';
console.log('Sample paths:');
allBlogs.slice(0, 5).forEach(p => console.log(p.path));
console.log('Looking for ba030:');
allBlogs.filter(p => p.path.includes('ba030-story')).forEach(p => console.log(p.path));

