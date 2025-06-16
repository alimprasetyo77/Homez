import { Camera } from "lucide-react";

const PhotosForm = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-8 shadow-sm border">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-500 font-bold text-lg">4</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Foto Properti</h2>
            <p className="text-gray-600">Upload foto berkualitas tinggi untuk menarik minat pembeli</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Foto Properti</h3>
            <p className="text-gray-600 mb-4">
              Drag & drop foto atau klik untuk memilih file
              <br />
              <span className="text-sm">Format: JPG, PNG (Max 5MB per file)</span>
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors">
              Pilih Foto
            </button>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Camera className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Tips Foto Terbaik</h4>
                <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                  <li>• Ambil foto di siang hari dengan cahaya alami</li>
                  <li>• Sertakan foto eksterior, interior, dan area sekitar</li>
                  <li>• Pastikan ruangan terlihat rapi dan bersih</li>
                  <li>• Upload minimal 5 foto untuk hasil terbaik</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"
              >
                <div className="text-center">
                  <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Foto {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosForm;
