import { useRef } from "react";
import BackGroundimg from "@/assets/Headimg.jpg";
import FileUploadIcon from "@mui/icons-material/FileUpload";
interface AvatarProps {
  setValue: any;
  displayImages: any;
  setDisplayImages: any;
}

const HeadImg = ({
  setValue,
  displayImages,
  setDisplayImages,
}: AvatarProps) => {
  // ------------- hooks ------------
  const imageRef: any = useRef(null);

  // ------------ function --------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const display = URL.createObjectURL(fileList[0]);

    setValue(fileList[0]);
    setDisplayImages(display);
  };

  return (
    <div className="relative">
      {displayImages ? (
        <div className="avatar">
          <div className="w-28 h-16 ">
            <img src={displayImages} alt="avatar" />
          </div>
        </div>
      ) : (
        <div className="avatar">
          <div className="w-28 h-16 ">
            <img
              src={BackGroundimg}
              alt="avatar"
              className=" border border-gray p-3"
            />
          </div>
        </div>
      )}
      <button
        className="w-8 h-8 bottom-[15px] right-[-8px] absolute border border-gray rounded-full bg-softGray hover:shadow"
        onClick={() => imageRef.current.click()}
        type="button"
      >
        <FileUploadIcon fontSize="small" />
      </button>

      <input
        type="file"
        id="avatar"
        className="hidden"
        ref={imageRef}
        name="avatar"
        accept="image/*"
        onChange={(event: any) => {
          handleImageChange(event);
        }}
      />
    </div>
  );
};

export default HeadImg;
