import {
  HARD_MODE_DESCRIPTION,
  HIGH_CONTRAST_MODE_DESCRIPTION,
  INSTALL_BUTTON_TEXT,
} from '../../constants/strings'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
}

export const InstallButton = () => {
  let wnd = window as any

  if (wnd.AddToHomeScreenInstance === undefined) {
    wnd.AddToHomeScreenInstance = wnd.AddToHomeScreen({
      appName: 'Dojo Wordle', // Name of the app.
      // Required.
      appNameDisplay: 'inline', // If set to 'standalone' (the default), the app name will be diplayed
      // on it's own, beneath the "Install App" header. If set to 'inline', the
      // app name will be displayed on a single line like "Install MyApp"
      // Optional. Default 'standalone'
      appIconUrl: 'apple-touch-icon.png', // App icon link (square, at least 40 x 40 pixels).
      // Required.
      assetUrl:
        'https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@2.4/dist/assets/img/', // Link to directory of library image assets.

      maxModalDisplayCount: -1, // If set, the modal will only show this many times.
      // Optional. Default: -1 (no limit).  (Debugging: Use this.clearModalDisplayCount() to reset the count)
    })
  }

  const isDesktop =
    wnd.AddToHomeScreenInstance.isDesktopWindows() ||
    wnd.AddToHomeScreenInstance.isDesktopChrome() ||
    wnd.AddToHomeScreenInstance.isDesktopEdge() ||
    wnd.AddToHomeScreenInstance.isDesktopMac() ||
    wnd.AddToHomeScreenInstance.isDesktopSafari()

  if (isDesktop) return null

  return (
    <button
      type="button"
      className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-gray-500 disabled:bg-white disabled:text-gray-900
    disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-base sm:text-base"
      onClick={() => {
        let wnd = window as any
        wnd.AddToHomeScreenInstance.show('en')
      }}
    >
      {INSTALL_BUTTON_TEXT}
    </button>
  )
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: Props) => {
  return (
    <BaseModal title="Settings" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
        <SettingsToggle
          settingName="Hard Mode"
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={HARD_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName="Dark Mode"
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode"
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={HIGH_CONTRAST_MODE_DESCRIPTION}
        />
      </div>
      <InstallButton />
    </BaseModal>
  )
}
