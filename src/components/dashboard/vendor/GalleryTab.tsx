
import { Button } from '@/components/ui/button';
import { Upload, Search, Edit, Trash2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
}

const GalleryTab = ({ galleryImages }: { galleryImages: GalleryImage[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Gallery</h2>
        <Button className="bg-wedding-red hover:bg-wedding-red/90">
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-md">
            <img 
              src={image.url} 
              alt={`Gallery image ${image.id}`} 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="bg-white">
                  <Search className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
