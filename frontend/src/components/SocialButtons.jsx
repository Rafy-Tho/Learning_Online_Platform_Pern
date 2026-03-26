import { socialLogins } from "../constants/socialLogins";

function SocialButtons() {
  return (
    <div className="space-y-4">
      {socialLogins.map((social) => {
        const Icon = social.icon;
        return (
          <button
            key={social.name}
            className={`w-full ${social.bgColor} ${social.textColor} ${social.hoverColor} border ${social.borderColor} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-3 transition-all duration-200 transform  shadow-md hover:shadow-xl cursor-pointer`}
          >
            <Icon className="text-lg" />
            <span>Continue with {social.name}</span>
          </button>
        );
      })}

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4  text-white/80">Or register with email</span>
        </div>
      </div>
    </div>
  );
}

export default SocialButtons;
