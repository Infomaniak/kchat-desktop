"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIcon = exports.CheckCircleIcon = exports.CheckCircleOutlineIcon = exports.CheckAllIcon = exports.ChartLineIcon = exports.ChartBarIcon = exports.CellphoneIcon = exports.CarOutlineIcon = exports.CancelIcon = exports.CameraOutlineIcon = exports.CalendarOutlineIcon = exports.CalendarMonthOutlineIcon = exports.CalendarCheckOutlineIcon = exports.BrandZoomIcon = exports.BrandOneLoginIcon = exports.BrandOffice365Icon = exports.BrandGoogleIcon = exports.BrandGitlabIcon = exports.BookmarkIcon = exports.BookmarkOutlineIcon = exports.BellOutlineIcon = exports.BellOffOutlineIcon = exports.BeachUmbrellaOutlineIcon = exports.BasketballIcon = exports.AtIcon = exports.ArrowUpIcon = exports.ArrowUpBoldCircleOutlineIcon = exports.ArrowRightIcon = exports.ArrowRightBoldOutlineIcon = exports.ArrowLeftIcon = exports.ArrowForwardIosIcon = exports.ArrowExpandIcon = exports.ArrowExpandAllIcon = exports.ArrowDownIcon = exports.ArrowDownBoldCircleOutlineIcon = exports.ArrowCollapseIcon = exports.ArrowBackIosIcon = exports.ArchiveOutlineIcon = exports.ArchiveArrowUpOutlineIcon = exports.AppsIcon = exports.ApplicationCogIcon = exports.AlertOutlineIcon = exports.AlertCircleOutlineIcon = exports.AirplaneIcon = exports.AirplaneVariantIcon = exports.AccountPlusOutlineIcon = exports.AccountOutlineIcon = exports.AccountMultiplePlusOutlineIcon = exports.AccountMultipleOutlineIcon = exports.AccountMinusOutlineIcon = void 0;
exports.FileGenericOutlineIcon = exports.FileGenericOutlineLargeIcon = exports.FileExcelOutlineIcon = exports.FileExcelOutlineLargeIcon = exports.FileCodeOutlineIcon = exports.FileCodeOutlineLargeIcon = exports.FileAudioOutlineIcon = exports.FileAudioOutlineLargeIcon = exports.EyeOutlineIcon = exports.EyeOffOutlineIcon = exports.ExportVariantIcon = exports.ExitToAppIcon = exports.ExclamationThickIcon = exports.EmoticonPlusOutlineIcon = exports.EmoticonOutlineIcon = exports.EmoticonHappyOutlineIcon = exports.EmoticonCustomOutlineIcon = exports.EmailVariantIcon = exports.EmailPlusOutlineIcon = exports.EmailOutlineIcon = exports.DrawIcon = exports.DragVerticalIcon = exports.DownloadOutlineIcon = exports.DotsVerticalIcon = exports.DotsHorizontalIcon = exports.DockWindowIcon = exports.DockLeftIcon = exports.CurrencyUsdIcon = exports.CrownOutlineIcon = exports.CreditCardOutlineIcon = exports.ContentCopyIcon = exports.ConsoleIcon = exports.CogOutlineIcon = exports.CodeTagsIcon = exports.CodeBracketsIcon = exports.CloseIcon = exports.CloseCircleIcon = exports.CloseCircleOutlineIcon = exports.ClockIcon = exports.ClockOutlineIcon = exports.CircleOutlineIcon = exports.CircleMultipleOutlineIcon = exports.CircleMultipleOutlineLockIcon = exports.ChevronUpIcon = exports.ChevronRightIcon = exports.ChevronLeftIcon = exports.ChevronDownIcon = exports.ChevronDownCircleOutlineIcon = exports.CheckboxMarkedIcon = exports.CheckboxBlankOutlineIcon = void 0;
exports.GlassesIcon = exports.GithubCircleIcon = exports.GfycatIcon = exports.ForumOutlineIcon = exports.FormatStrikethroughVariantIcon = exports.FormatQuoteOpenIcon = exports.FormatListNumberedIcon = exports.FormatListBulletedIcon = exports.FormatLetterCaseIcon = exports.FormatItalicIcon = exports.FormatHeaderIcon = exports.FormatHeader6Icon = exports.FormatHeader5Icon = exports.FormatHeader4Icon = exports.FormatHeader3Icon = exports.FormatHeader2Icon = exports.FormatHeader1Icon = exports.FormatClearIcon = exports.FormatBoldIcon = exports.FoodForkDrinkIcon = exports.FoodAppleIcon = exports.FolderPlusOutlineIcon = exports.FolderOutlineIcon = exports.FolderMoveOutlineIcon = exports.FlaskOutlineIcon = exports.FlagIcon = exports.FlagOutlineIcon = exports.FireIcon = exports.FilterVariantIcon = exports.FileZipOutlineIcon = exports.FileZipOutlineLargeIcon = exports.FileWordOutlineIcon = exports.FileWordOutlineLargeIcon = exports.FileVideoOutlineIcon = exports.FileVideoOutlineLargeIcon = exports.FileTextOutlineIcon = exports.FileTextOutlineLargeIcon = exports.FilePowerpointOutlineIcon = exports.FilePowerpointOutlineLargeIcon = exports.FilePdfOutlineIcon = exports.FilePdfOutlineLargeIcon = exports.FilePatchOutlineIcon = exports.FilePatchOutlineLargeIcon = exports.FileMultipleOutlineIcon = exports.FileMultipleOutlineLargeIcon = exports.FileImageOutlineIcon = exports.FileImageOutlineLargeIcon = exports.FileImageBrokenOutlineIcon = exports.FileImageBrokenOutlineLargeIcon = exports.FileGifIcon = void 0;
exports.MonitorIcon = exports.MinusIcon = exports.MinusCircleIcon = exports.MinusCircleOutlineIcon = exports.MinusBoxIcon = exports.MicrophoneIcon = exports.MicrophoneOffIcon = exports.MessageTextOutlineIcon = exports.MessagePlusOutlineIcon = exports.MessageMinusOutlineIcon = exports.MessageCheckIcon = exports.MessageCheckOutlineIcon = exports.MenuIcon = exports.MenuVariantIcon = exports.MenuUpIcon = exports.MenuRightIcon = exports.MenuLeftIcon = exports.MenuDownIcon = exports.MattermostIcon = exports.MarkAsUnreadIcon = exports.MagnifyIcon = exports.MagnifyPlusIcon = exports.MagnifyMinusIcon = exports.LogoutVariantIcon = exports.LockIcon = exports.LockOutlineIcon = exports.LinkVariantIcon = exports.LinkVariantOffIcon = exports.LightningBoltOutlineIcon = exports.LightbulbOutlineIcon = exports.LeafIcon = exports.LeafOutlineIcon = exports.LayersOutlineIcon = exports.LaptopIcon = exports.KeyVariantIcon = exports.KeyVariantCircleIcon = exports.KanbanIcon = exports.InformationOutlineIcon = exports.InfinityIcon = exports.ImageOutlineIcon = exports.ImageBrokenOutlineIcon = exports.ImageAreaOutlineIcon = exports.IframeListOutlineIcon = exports.HomeVariantOutlineIcon = exports.HelpIcon = exports.HelpCircleOutlineIcon = exports.HeartOutlineIcon = exports.HandRightIcon = exports.HammerIcon = exports.GlobeIcon = void 0;
exports.TableLargeIcon = exports.SyncIcon = exports.StarIcon = exports.StarOutlineIcon = exports.SquareIcon = exports.SourcePullIcon = exports.SourceBranchIcon = exports.SortAlphabeticalAscendingIcon = exports.SoccerIcon = exports.SlashForwardIcon = exports.SlashForwardBoxOutlineIcon = exports.SitemapIcon = exports.ShieldOutlineIcon = exports.ShieldAlertOutlineIcon = exports.ShareVariantOutlineIcon = exports.SettingsOutlineIcon = exports.ServerVariantIcon = exports.ServerVariantPlusIcon = exports.ServerOutlineIcon = exports.SendIcon = exports.SendOutlineIcon = exports.SearchListIcon = exports.RobotHappyIcon = exports.ReplyOutlineIcon = exports.RefreshIcon = exports.RadioboxMarkedIcon = exports.RadioboxBlankIcon = exports.ProductsIcon = exports.ProductPlaybooksIcon = exports.ProductChannelsIcon = exports.ProductBoardsIcon = exports.PowerPlugOutlineIcon = exports.PoundIcon = exports.PlusIcon = exports.PlusBoxIcon = exports.PlusBoxOutlineIcon = exports.PlaylistCheckIcon = exports.PlayIcon = exports.PinIcon = exports.PinOutlineIcon = exports.PhoneOutlineIcon = exports.PhoneInTalkIcon = exports.PhoneHangupIcon = exports.PencilOutlineIcon = exports.PauseIcon = exports.PaperclipIcon = exports.PaletteOutlineIcon = exports.OpenInNewIcon = exports.OauthIcon = exports.NotebookOutlineIcon = void 0;
exports.WebhookIcon = exports.WebhookOutgoingIcon = exports.WebhookIncomingIcon = exports.VolumeHighIcon = exports.ViewGridPlusOutlineIcon = exports.VideoOutlineIcon = exports.UpdateIcon = exports.TuneIcon = exports.TrashCanOutlineIcon = exports.ThumbsUpDownIcon = void 0;
const account_minus_outline_1 = __importDefault(require("./account-minus-outline"));
exports.AccountMinusOutlineIcon = account_minus_outline_1.default;
const account_multiple_outline_1 = __importDefault(require("./account-multiple-outline"));
exports.AccountMultipleOutlineIcon = account_multiple_outline_1.default;
const account_multiple_plus_outline_1 = __importDefault(require("./account-multiple-plus-outline"));
exports.AccountMultiplePlusOutlineIcon = account_multiple_plus_outline_1.default;
const account_outline_1 = __importDefault(require("./account-outline"));
exports.AccountOutlineIcon = account_outline_1.default;
const account_plus_outline_1 = __importDefault(require("./account-plus-outline"));
exports.AccountPlusOutlineIcon = account_plus_outline_1.default;
const airplane_variant_1 = __importDefault(require("./airplane-variant"));
exports.AirplaneVariantIcon = airplane_variant_1.default;
const airplane_1 = __importDefault(require("./airplane"));
exports.AirplaneIcon = airplane_1.default;
const alert_circle_outline_1 = __importDefault(require("./alert-circle-outline"));
exports.AlertCircleOutlineIcon = alert_circle_outline_1.default;
const alert_outline_1 = __importDefault(require("./alert-outline"));
exports.AlertOutlineIcon = alert_outline_1.default;
const application_cog_1 = __importDefault(require("./application-cog"));
exports.ApplicationCogIcon = application_cog_1.default;
const apps_1 = __importDefault(require("./apps"));
exports.AppsIcon = apps_1.default;
const archive_arrow_up_outline_1 = __importDefault(require("./archive-arrow-up-outline"));
exports.ArchiveArrowUpOutlineIcon = archive_arrow_up_outline_1.default;
const archive_outline_1 = __importDefault(require("./archive-outline"));
exports.ArchiveOutlineIcon = archive_outline_1.default;
const arrow_back_ios_1 = __importDefault(require("./arrow-back-ios"));
exports.ArrowBackIosIcon = arrow_back_ios_1.default;
const arrow_collapse_1 = __importDefault(require("./arrow-collapse"));
exports.ArrowCollapseIcon = arrow_collapse_1.default;
const arrow_down_bold_circle_outline_1 = __importDefault(require("./arrow-down-bold-circle-outline"));
exports.ArrowDownBoldCircleOutlineIcon = arrow_down_bold_circle_outline_1.default;
const arrow_down_1 = __importDefault(require("./arrow-down"));
exports.ArrowDownIcon = arrow_down_1.default;
const arrow_expand_all_1 = __importDefault(require("./arrow-expand-all"));
exports.ArrowExpandAllIcon = arrow_expand_all_1.default;
const arrow_expand_1 = __importDefault(require("./arrow-expand"));
exports.ArrowExpandIcon = arrow_expand_1.default;
const arrow_forward_ios_1 = __importDefault(require("./arrow-forward-ios"));
exports.ArrowForwardIosIcon = arrow_forward_ios_1.default;
const arrow_left_1 = __importDefault(require("./arrow-left"));
exports.ArrowLeftIcon = arrow_left_1.default;
const arrow_right_bold_outline_1 = __importDefault(require("./arrow-right-bold-outline"));
exports.ArrowRightBoldOutlineIcon = arrow_right_bold_outline_1.default;
const arrow_right_1 = __importDefault(require("./arrow-right"));
exports.ArrowRightIcon = arrow_right_1.default;
const arrow_up_bold_circle_outline_1 = __importDefault(require("./arrow-up-bold-circle-outline"));
exports.ArrowUpBoldCircleOutlineIcon = arrow_up_bold_circle_outline_1.default;
const arrow_up_1 = __importDefault(require("./arrow-up"));
exports.ArrowUpIcon = arrow_up_1.default;
const at_1 = __importDefault(require("./at"));
exports.AtIcon = at_1.default;
const basketball_1 = __importDefault(require("./basketball"));
exports.BasketballIcon = basketball_1.default;
const beach_umbrella_outline_1 = __importDefault(require("./beach-umbrella-outline"));
exports.BeachUmbrellaOutlineIcon = beach_umbrella_outline_1.default;
const bell_off_outline_1 = __importDefault(require("./bell-off-outline"));
exports.BellOffOutlineIcon = bell_off_outline_1.default;
const bell_outline_1 = __importDefault(require("./bell-outline"));
exports.BellOutlineIcon = bell_outline_1.default;
const bookmark_outline_1 = __importDefault(require("./bookmark-outline"));
exports.BookmarkOutlineIcon = bookmark_outline_1.default;
const bookmark_1 = __importDefault(require("./bookmark"));
exports.BookmarkIcon = bookmark_1.default;
const brand_gitlab_1 = __importDefault(require("./brand-gitlab"));
exports.BrandGitlabIcon = brand_gitlab_1.default;
const brand_google_1 = __importDefault(require("./brand-google"));
exports.BrandGoogleIcon = brand_google_1.default;
const brand_office_365_1 = __importDefault(require("./brand-office-365"));
exports.BrandOffice365Icon = brand_office_365_1.default;
const brand_one_login_1 = __importDefault(require("./brand-one-login"));
exports.BrandOneLoginIcon = brand_one_login_1.default;
const brand_zoom_1 = __importDefault(require("./brand-zoom"));
exports.BrandZoomIcon = brand_zoom_1.default;
const calendar_check_outline_1 = __importDefault(require("./calendar-check-outline"));
exports.CalendarCheckOutlineIcon = calendar_check_outline_1.default;
const calendar_month_outline_1 = __importDefault(require("./calendar-month-outline"));
exports.CalendarMonthOutlineIcon = calendar_month_outline_1.default;
const calendar_outline_1 = __importDefault(require("./calendar-outline"));
exports.CalendarOutlineIcon = calendar_outline_1.default;
const camera_outline_1 = __importDefault(require("./camera-outline"));
exports.CameraOutlineIcon = camera_outline_1.default;
const cancel_1 = __importDefault(require("./cancel"));
exports.CancelIcon = cancel_1.default;
const car_outline_1 = __importDefault(require("./car-outline"));
exports.CarOutlineIcon = car_outline_1.default;
const cellphone_1 = __importDefault(require("./cellphone"));
exports.CellphoneIcon = cellphone_1.default;
const chart_bar_1 = __importDefault(require("./chart-bar"));
exports.ChartBarIcon = chart_bar_1.default;
const chart_line_1 = __importDefault(require("./chart-line"));
exports.ChartLineIcon = chart_line_1.default;
const check_all_1 = __importDefault(require("./check-all"));
exports.CheckAllIcon = check_all_1.default;
const check_circle_outline_1 = __importDefault(require("./check-circle-outline"));
exports.CheckCircleOutlineIcon = check_circle_outline_1.default;
const check_circle_1 = __importDefault(require("./check-circle"));
exports.CheckCircleIcon = check_circle_1.default;
const check_1 = __importDefault(require("./check"));
exports.CheckIcon = check_1.default;
const checkbox_blank_outline_1 = __importDefault(require("./checkbox-blank-outline"));
exports.CheckboxBlankOutlineIcon = checkbox_blank_outline_1.default;
const checkbox_marked_1 = __importDefault(require("./checkbox-marked"));
exports.CheckboxMarkedIcon = checkbox_marked_1.default;
const chevron_down_circle_outline_1 = __importDefault(require("./chevron-down-circle-outline"));
exports.ChevronDownCircleOutlineIcon = chevron_down_circle_outline_1.default;
const chevron_down_1 = __importDefault(require("./chevron-down"));
exports.ChevronDownIcon = chevron_down_1.default;
const chevron_left_1 = __importDefault(require("./chevron-left"));
exports.ChevronLeftIcon = chevron_left_1.default;
const chevron_right_1 = __importDefault(require("./chevron-right"));
exports.ChevronRightIcon = chevron_right_1.default;
const chevron_up_1 = __importDefault(require("./chevron-up"));
exports.ChevronUpIcon = chevron_up_1.default;
const circle_multiple_outline_lock_1 = __importDefault(require("./circle-multiple-outline-lock"));
exports.CircleMultipleOutlineLockIcon = circle_multiple_outline_lock_1.default;
const circle_multiple_outline_1 = __importDefault(require("./circle-multiple-outline"));
exports.CircleMultipleOutlineIcon = circle_multiple_outline_1.default;
const circle_outline_1 = __importDefault(require("./circle-outline"));
exports.CircleOutlineIcon = circle_outline_1.default;
const clock_outline_1 = __importDefault(require("./clock-outline"));
exports.ClockOutlineIcon = clock_outline_1.default;
const clock_1 = __importDefault(require("./clock"));
exports.ClockIcon = clock_1.default;
const close_circle_outline_1 = __importDefault(require("./close-circle-outline"));
exports.CloseCircleOutlineIcon = close_circle_outline_1.default;
const close_circle_1 = __importDefault(require("./close-circle"));
exports.CloseCircleIcon = close_circle_1.default;
const close_1 = __importDefault(require("./close"));
exports.CloseIcon = close_1.default;
const code_brackets_1 = __importDefault(require("./code-brackets"));
exports.CodeBracketsIcon = code_brackets_1.default;
const code_tags_1 = __importDefault(require("./code-tags"));
exports.CodeTagsIcon = code_tags_1.default;
const cog_outline_1 = __importDefault(require("./cog-outline"));
exports.CogOutlineIcon = cog_outline_1.default;
const console_1 = __importDefault(require("./console"));
exports.ConsoleIcon = console_1.default;
const content_copy_1 = __importDefault(require("./content-copy"));
exports.ContentCopyIcon = content_copy_1.default;
const credit_card_outline_1 = __importDefault(require("./credit-card-outline"));
exports.CreditCardOutlineIcon = credit_card_outline_1.default;
const crown_outline_1 = __importDefault(require("./crown-outline"));
exports.CrownOutlineIcon = crown_outline_1.default;
const currency_usd_1 = __importDefault(require("./currency-usd"));
exports.CurrencyUsdIcon = currency_usd_1.default;
const dock_left_1 = __importDefault(require("./dock-left"));
exports.DockLeftIcon = dock_left_1.default;
const dock_window_1 = __importDefault(require("./dock-window"));
exports.DockWindowIcon = dock_window_1.default;
const dots_horizontal_1 = __importDefault(require("./dots-horizontal"));
exports.DotsHorizontalIcon = dots_horizontal_1.default;
const dots_vertical_1 = __importDefault(require("./dots-vertical"));
exports.DotsVerticalIcon = dots_vertical_1.default;
const download_outline_1 = __importDefault(require("./download-outline"));
exports.DownloadOutlineIcon = download_outline_1.default;
const drag_vertical_1 = __importDefault(require("./drag-vertical"));
exports.DragVerticalIcon = drag_vertical_1.default;
const draw_1 = __importDefault(require("./draw"));
exports.DrawIcon = draw_1.default;
const email_outline_1 = __importDefault(require("./email-outline"));
exports.EmailOutlineIcon = email_outline_1.default;
const email_plus_outline_1 = __importDefault(require("./email-plus-outline"));
exports.EmailPlusOutlineIcon = email_plus_outline_1.default;
const email_variant_1 = __importDefault(require("./email-variant"));
exports.EmailVariantIcon = email_variant_1.default;
const emoticon_custom_outline_1 = __importDefault(require("./emoticon-custom-outline"));
exports.EmoticonCustomOutlineIcon = emoticon_custom_outline_1.default;
const emoticon_happy_outline_1 = __importDefault(require("./emoticon-happy-outline"));
exports.EmoticonHappyOutlineIcon = emoticon_happy_outline_1.default;
const emoticon_outline_1 = __importDefault(require("./emoticon-outline"));
exports.EmoticonOutlineIcon = emoticon_outline_1.default;
const emoticon_plus_outline_1 = __importDefault(require("./emoticon-plus-outline"));
exports.EmoticonPlusOutlineIcon = emoticon_plus_outline_1.default;
const exclamation_thick_1 = __importDefault(require("./exclamation-thick"));
exports.ExclamationThickIcon = exclamation_thick_1.default;
const exit_to_app_1 = __importDefault(require("./exit-to-app"));
exports.ExitToAppIcon = exit_to_app_1.default;
const export_variant_1 = __importDefault(require("./export-variant"));
exports.ExportVariantIcon = export_variant_1.default;
const eye_off_outline_1 = __importDefault(require("./eye-off-outline"));
exports.EyeOffOutlineIcon = eye_off_outline_1.default;
const eye_outline_1 = __importDefault(require("./eye-outline"));
exports.EyeOutlineIcon = eye_outline_1.default;
const file_audio_outline_large_1 = __importDefault(require("./file-audio-outline-large"));
exports.FileAudioOutlineLargeIcon = file_audio_outline_large_1.default;
const file_audio_outline_1 = __importDefault(require("./file-audio-outline"));
exports.FileAudioOutlineIcon = file_audio_outline_1.default;
const file_code_outline_large_1 = __importDefault(require("./file-code-outline-large"));
exports.FileCodeOutlineLargeIcon = file_code_outline_large_1.default;
const file_code_outline_1 = __importDefault(require("./file-code-outline"));
exports.FileCodeOutlineIcon = file_code_outline_1.default;
const file_excel_outline_large_1 = __importDefault(require("./file-excel-outline-large"));
exports.FileExcelOutlineLargeIcon = file_excel_outline_large_1.default;
const file_excel_outline_1 = __importDefault(require("./file-excel-outline"));
exports.FileExcelOutlineIcon = file_excel_outline_1.default;
const file_generic_outline_large_1 = __importDefault(require("./file-generic-outline-large"));
exports.FileGenericOutlineLargeIcon = file_generic_outline_large_1.default;
const file_generic_outline_1 = __importDefault(require("./file-generic-outline"));
exports.FileGenericOutlineIcon = file_generic_outline_1.default;
const file_gif_1 = __importDefault(require("./file-gif"));
exports.FileGifIcon = file_gif_1.default;
const file_image_broken_outline_large_1 = __importDefault(require("./file-image-broken-outline-large"));
exports.FileImageBrokenOutlineLargeIcon = file_image_broken_outline_large_1.default;
const file_image_broken_outline_1 = __importDefault(require("./file-image-broken-outline"));
exports.FileImageBrokenOutlineIcon = file_image_broken_outline_1.default;
const file_image_outline_large_1 = __importDefault(require("./file-image-outline-large"));
exports.FileImageOutlineLargeIcon = file_image_outline_large_1.default;
const file_image_outline_1 = __importDefault(require("./file-image-outline"));
exports.FileImageOutlineIcon = file_image_outline_1.default;
const file_multiple_outline_large_1 = __importDefault(require("./file-multiple-outline-large"));
exports.FileMultipleOutlineLargeIcon = file_multiple_outline_large_1.default;
const file_multiple_outline_1 = __importDefault(require("./file-multiple-outline"));
exports.FileMultipleOutlineIcon = file_multiple_outline_1.default;
const file_patch_outline_large_1 = __importDefault(require("./file-patch-outline-large"));
exports.FilePatchOutlineLargeIcon = file_patch_outline_large_1.default;
const file_patch_outline_1 = __importDefault(require("./file-patch-outline"));
exports.FilePatchOutlineIcon = file_patch_outline_1.default;
const file_pdf_outline_large_1 = __importDefault(require("./file-pdf-outline-large"));
exports.FilePdfOutlineLargeIcon = file_pdf_outline_large_1.default;
const file_pdf_outline_1 = __importDefault(require("./file-pdf-outline"));
exports.FilePdfOutlineIcon = file_pdf_outline_1.default;
const file_powerpoint_outline_large_1 = __importDefault(require("./file-powerpoint-outline-large"));
exports.FilePowerpointOutlineLargeIcon = file_powerpoint_outline_large_1.default;
const file_powerpoint_outline_1 = __importDefault(require("./file-powerpoint-outline"));
exports.FilePowerpointOutlineIcon = file_powerpoint_outline_1.default;
const file_text_outline_large_1 = __importDefault(require("./file-text-outline-large"));
exports.FileTextOutlineLargeIcon = file_text_outline_large_1.default;
const file_text_outline_1 = __importDefault(require("./file-text-outline"));
exports.FileTextOutlineIcon = file_text_outline_1.default;
const file_video_outline_large_1 = __importDefault(require("./file-video-outline-large"));
exports.FileVideoOutlineLargeIcon = file_video_outline_large_1.default;
const file_video_outline_1 = __importDefault(require("./file-video-outline"));
exports.FileVideoOutlineIcon = file_video_outline_1.default;
const file_word_outline_large_1 = __importDefault(require("./file-word-outline-large"));
exports.FileWordOutlineLargeIcon = file_word_outline_large_1.default;
const file_word_outline_1 = __importDefault(require("./file-word-outline"));
exports.FileWordOutlineIcon = file_word_outline_1.default;
const file_zip_outline_large_1 = __importDefault(require("./file-zip-outline-large"));
exports.FileZipOutlineLargeIcon = file_zip_outline_large_1.default;
const file_zip_outline_1 = __importDefault(require("./file-zip-outline"));
exports.FileZipOutlineIcon = file_zip_outline_1.default;
const filter_variant_1 = __importDefault(require("./filter-variant"));
exports.FilterVariantIcon = filter_variant_1.default;
const fire_1 = __importDefault(require("./fire"));
exports.FireIcon = fire_1.default;
const flag_outline_1 = __importDefault(require("./flag-outline"));
exports.FlagOutlineIcon = flag_outline_1.default;
const flag_1 = __importDefault(require("./flag"));
exports.FlagIcon = flag_1.default;
const flask_outline_1 = __importDefault(require("./flask-outline"));
exports.FlaskOutlineIcon = flask_outline_1.default;
const folder_move_outline_1 = __importDefault(require("./folder-move-outline"));
exports.FolderMoveOutlineIcon = folder_move_outline_1.default;
const folder_outline_1 = __importDefault(require("./folder-outline"));
exports.FolderOutlineIcon = folder_outline_1.default;
const folder_plus_outline_1 = __importDefault(require("./folder-plus-outline"));
exports.FolderPlusOutlineIcon = folder_plus_outline_1.default;
const food_apple_1 = __importDefault(require("./food-apple"));
exports.FoodAppleIcon = food_apple_1.default;
const food_fork_drink_1 = __importDefault(require("./food-fork-drink"));
exports.FoodForkDrinkIcon = food_fork_drink_1.default;
const format_bold_1 = __importDefault(require("./format-bold"));
exports.FormatBoldIcon = format_bold_1.default;
const format_clear_1 = __importDefault(require("./format-clear"));
exports.FormatClearIcon = format_clear_1.default;
const format_header_1_1 = __importDefault(require("./format-header-1"));
exports.FormatHeader1Icon = format_header_1_1.default;
const format_header_2_1 = __importDefault(require("./format-header-2"));
exports.FormatHeader2Icon = format_header_2_1.default;
const format_header_3_1 = __importDefault(require("./format-header-3"));
exports.FormatHeader3Icon = format_header_3_1.default;
const format_header_4_1 = __importDefault(require("./format-header-4"));
exports.FormatHeader4Icon = format_header_4_1.default;
const format_header_5_1 = __importDefault(require("./format-header-5"));
exports.FormatHeader5Icon = format_header_5_1.default;
const format_header_6_1 = __importDefault(require("./format-header-6"));
exports.FormatHeader6Icon = format_header_6_1.default;
const format_header_1 = __importDefault(require("./format-header"));
exports.FormatHeaderIcon = format_header_1.default;
const format_italic_1 = __importDefault(require("./format-italic"));
exports.FormatItalicIcon = format_italic_1.default;
const format_letter_case_1 = __importDefault(require("./format-letter-case"));
exports.FormatLetterCaseIcon = format_letter_case_1.default;
const format_list_bulleted_1 = __importDefault(require("./format-list-bulleted"));
exports.FormatListBulletedIcon = format_list_bulleted_1.default;
const format_list_numbered_1 = __importDefault(require("./format-list-numbered"));
exports.FormatListNumberedIcon = format_list_numbered_1.default;
const format_quote_open_1 = __importDefault(require("./format-quote-open"));
exports.FormatQuoteOpenIcon = format_quote_open_1.default;
const format_strikethrough_variant_1 = __importDefault(require("./format-strikethrough-variant"));
exports.FormatStrikethroughVariantIcon = format_strikethrough_variant_1.default;
const forum_outline_1 = __importDefault(require("./forum-outline"));
exports.ForumOutlineIcon = forum_outline_1.default;
const gfycat_1 = __importDefault(require("./gfycat"));
exports.GfycatIcon = gfycat_1.default;
const github_circle_1 = __importDefault(require("./github-circle"));
exports.GithubCircleIcon = github_circle_1.default;
const glasses_1 = __importDefault(require("./glasses"));
exports.GlassesIcon = glasses_1.default;
const globe_1 = __importDefault(require("./globe"));
exports.GlobeIcon = globe_1.default;
const hammer_1 = __importDefault(require("./hammer"));
exports.HammerIcon = hammer_1.default;
const hand_right_1 = __importDefault(require("./hand-right"));
exports.HandRightIcon = hand_right_1.default;
const heart_outline_1 = __importDefault(require("./heart-outline"));
exports.HeartOutlineIcon = heart_outline_1.default;
const help_circle_outline_1 = __importDefault(require("./help-circle-outline"));
exports.HelpCircleOutlineIcon = help_circle_outline_1.default;
const help_1 = __importDefault(require("./help"));
exports.HelpIcon = help_1.default;
const home_variant_outline_1 = __importDefault(require("./home-variant-outline"));
exports.HomeVariantOutlineIcon = home_variant_outline_1.default;
const iframe_list_outline_1 = __importDefault(require("./iframe-list-outline"));
exports.IframeListOutlineIcon = iframe_list_outline_1.default;
const image_area_outline_1 = __importDefault(require("./image-area-outline"));
exports.ImageAreaOutlineIcon = image_area_outline_1.default;
const image_broken_outline_1 = __importDefault(require("./image-broken-outline"));
exports.ImageBrokenOutlineIcon = image_broken_outline_1.default;
const image_outline_1 = __importDefault(require("./image-outline"));
exports.ImageOutlineIcon = image_outline_1.default;
const infinity_1 = __importDefault(require("./infinity"));
exports.InfinityIcon = infinity_1.default;
const information_outline_1 = __importDefault(require("./information-outline"));
exports.InformationOutlineIcon = information_outline_1.default;
const kanban_1 = __importDefault(require("./kanban"));
exports.KanbanIcon = kanban_1.default;
const key_variant_circle_1 = __importDefault(require("./key-variant-circle"));
exports.KeyVariantCircleIcon = key_variant_circle_1.default;
const key_variant_1 = __importDefault(require("./key-variant"));
exports.KeyVariantIcon = key_variant_1.default;
const laptop_1 = __importDefault(require("./laptop"));
exports.LaptopIcon = laptop_1.default;
const layers_outline_1 = __importDefault(require("./layers-outline"));
exports.LayersOutlineIcon = layers_outline_1.default;
const leaf_outline_1 = __importDefault(require("./leaf-outline"));
exports.LeafOutlineIcon = leaf_outline_1.default;
const leaf_1 = __importDefault(require("./leaf"));
exports.LeafIcon = leaf_1.default;
const lightbulb_outline_1 = __importDefault(require("./lightbulb-outline"));
exports.LightbulbOutlineIcon = lightbulb_outline_1.default;
const lightning_bolt_outline_1 = __importDefault(require("./lightning-bolt-outline"));
exports.LightningBoltOutlineIcon = lightning_bolt_outline_1.default;
const link_variant_off_1 = __importDefault(require("./link-variant-off"));
exports.LinkVariantOffIcon = link_variant_off_1.default;
const link_variant_1 = __importDefault(require("./link-variant"));
exports.LinkVariantIcon = link_variant_1.default;
const lock_outline_1 = __importDefault(require("./lock-outline"));
exports.LockOutlineIcon = lock_outline_1.default;
const lock_1 = __importDefault(require("./lock"));
exports.LockIcon = lock_1.default;
const logout_variant_1 = __importDefault(require("./logout-variant"));
exports.LogoutVariantIcon = logout_variant_1.default;
const magnify_minus_1 = __importDefault(require("./magnify-minus"));
exports.MagnifyMinusIcon = magnify_minus_1.default;
const magnify_plus_1 = __importDefault(require("./magnify-plus"));
exports.MagnifyPlusIcon = magnify_plus_1.default;
const magnify_1 = __importDefault(require("./magnify"));
exports.MagnifyIcon = magnify_1.default;
const mark_as_unread_1 = __importDefault(require("./mark-as-unread"));
exports.MarkAsUnreadIcon = mark_as_unread_1.default;
const mattermost_1 = __importDefault(require("./mattermost"));
exports.MattermostIcon = mattermost_1.default;
const menu_down_1 = __importDefault(require("./menu-down"));
exports.MenuDownIcon = menu_down_1.default;
const menu_left_1 = __importDefault(require("./menu-left"));
exports.MenuLeftIcon = menu_left_1.default;
const menu_right_1 = __importDefault(require("./menu-right"));
exports.MenuRightIcon = menu_right_1.default;
const menu_up_1 = __importDefault(require("./menu-up"));
exports.MenuUpIcon = menu_up_1.default;
const menu_variant_1 = __importDefault(require("./menu-variant"));
exports.MenuVariantIcon = menu_variant_1.default;
const menu_1 = __importDefault(require("./menu"));
exports.MenuIcon = menu_1.default;
const message_check_outline_1 = __importDefault(require("./message-check-outline"));
exports.MessageCheckOutlineIcon = message_check_outline_1.default;
const message_check_1 = __importDefault(require("./message-check"));
exports.MessageCheckIcon = message_check_1.default;
const message_minus_outline_1 = __importDefault(require("./message-minus-outline"));
exports.MessageMinusOutlineIcon = message_minus_outline_1.default;
const message_plus_outline_1 = __importDefault(require("./message-plus-outline"));
exports.MessagePlusOutlineIcon = message_plus_outline_1.default;
const message_text_outline_1 = __importDefault(require("./message-text-outline"));
exports.MessageTextOutlineIcon = message_text_outline_1.default;
const microphone_off_1 = __importDefault(require("./microphone-off"));
exports.MicrophoneOffIcon = microphone_off_1.default;
const microphone_1 = __importDefault(require("./microphone"));
exports.MicrophoneIcon = microphone_1.default;
const minus_box_1 = __importDefault(require("./minus-box"));
exports.MinusBoxIcon = minus_box_1.default;
const minus_circle_outline_1 = __importDefault(require("./minus-circle-outline"));
exports.MinusCircleOutlineIcon = minus_circle_outline_1.default;
const minus_circle_1 = __importDefault(require("./minus-circle"));
exports.MinusCircleIcon = minus_circle_1.default;
const minus_1 = __importDefault(require("./minus"));
exports.MinusIcon = minus_1.default;
const monitor_1 = __importDefault(require("./monitor"));
exports.MonitorIcon = monitor_1.default;
const notebook_outline_1 = __importDefault(require("./notebook-outline"));
exports.NotebookOutlineIcon = notebook_outline_1.default;
const oauth_1 = __importDefault(require("./oauth"));
exports.OauthIcon = oauth_1.default;
const open_in_new_1 = __importDefault(require("./open-in-new"));
exports.OpenInNewIcon = open_in_new_1.default;
const palette_outline_1 = __importDefault(require("./palette-outline"));
exports.PaletteOutlineIcon = palette_outline_1.default;
const paperclip_1 = __importDefault(require("./paperclip"));
exports.PaperclipIcon = paperclip_1.default;
const pause_1 = __importDefault(require("./pause"));
exports.PauseIcon = pause_1.default;
const pencil_outline_1 = __importDefault(require("./pencil-outline"));
exports.PencilOutlineIcon = pencil_outline_1.default;
const phone_hangup_1 = __importDefault(require("./phone-hangup"));
exports.PhoneHangupIcon = phone_hangup_1.default;
const phone_in_talk_1 = __importDefault(require("./phone-in-talk"));
exports.PhoneInTalkIcon = phone_in_talk_1.default;
const phone_outline_1 = __importDefault(require("./phone-outline"));
exports.PhoneOutlineIcon = phone_outline_1.default;
const pin_outline_1 = __importDefault(require("./pin-outline"));
exports.PinOutlineIcon = pin_outline_1.default;
const pin_1 = __importDefault(require("./pin"));
exports.PinIcon = pin_1.default;
const play_1 = __importDefault(require("./play"));
exports.PlayIcon = play_1.default;
const playlist_check_1 = __importDefault(require("./playlist-check"));
exports.PlaylistCheckIcon = playlist_check_1.default;
const plus_box_outline_1 = __importDefault(require("./plus-box-outline"));
exports.PlusBoxOutlineIcon = plus_box_outline_1.default;
const plus_box_1 = __importDefault(require("./plus-box"));
exports.PlusBoxIcon = plus_box_1.default;
const plus_1 = __importDefault(require("./plus"));
exports.PlusIcon = plus_1.default;
const pound_1 = __importDefault(require("./pound"));
exports.PoundIcon = pound_1.default;
const power_plug_outline_1 = __importDefault(require("./power-plug-outline"));
exports.PowerPlugOutlineIcon = power_plug_outline_1.default;
const product_boards_1 = __importDefault(require("./product-boards"));
exports.ProductBoardsIcon = product_boards_1.default;
const product_channels_1 = __importDefault(require("./product-channels"));
exports.ProductChannelsIcon = product_channels_1.default;
const product_playbooks_1 = __importDefault(require("./product-playbooks"));
exports.ProductPlaybooksIcon = product_playbooks_1.default;
const products_1 = __importDefault(require("./products"));
exports.ProductsIcon = products_1.default;
const radiobox_blank_1 = __importDefault(require("./radiobox-blank"));
exports.RadioboxBlankIcon = radiobox_blank_1.default;
const radiobox_marked_1 = __importDefault(require("./radiobox-marked"));
exports.RadioboxMarkedIcon = radiobox_marked_1.default;
const refresh_1 = __importDefault(require("./refresh"));
exports.RefreshIcon = refresh_1.default;
const reply_outline_1 = __importDefault(require("./reply-outline"));
exports.ReplyOutlineIcon = reply_outline_1.default;
const robot_happy_1 = __importDefault(require("./robot-happy"));
exports.RobotHappyIcon = robot_happy_1.default;
const search_list_1 = __importDefault(require("./search-list"));
exports.SearchListIcon = search_list_1.default;
const send_outline_1 = __importDefault(require("./send-outline"));
exports.SendOutlineIcon = send_outline_1.default;
const send_1 = __importDefault(require("./send"));
exports.SendIcon = send_1.default;
const server_outline_1 = __importDefault(require("./server-outline"));
exports.ServerOutlineIcon = server_outline_1.default;
const server_variant_plus_1 = __importDefault(require("./server-variant-plus"));
exports.ServerVariantPlusIcon = server_variant_plus_1.default;
const server_variant_1 = __importDefault(require("./server-variant"));
exports.ServerVariantIcon = server_variant_1.default;
const settings_outline_1 = __importDefault(require("./settings-outline"));
exports.SettingsOutlineIcon = settings_outline_1.default;
const share_variant_outline_1 = __importDefault(require("./share-variant-outline"));
exports.ShareVariantOutlineIcon = share_variant_outline_1.default;
const shield_alert_outline_1 = __importDefault(require("./shield-alert-outline"));
exports.ShieldAlertOutlineIcon = shield_alert_outline_1.default;
const shield_outline_1 = __importDefault(require("./shield-outline"));
exports.ShieldOutlineIcon = shield_outline_1.default;
const sitemap_1 = __importDefault(require("./sitemap"));
exports.SitemapIcon = sitemap_1.default;
const slash_forward_box_outline_1 = __importDefault(require("./slash-forward-box-outline"));
exports.SlashForwardBoxOutlineIcon = slash_forward_box_outline_1.default;
const slash_forward_1 = __importDefault(require("./slash-forward"));
exports.SlashForwardIcon = slash_forward_1.default;
const soccer_1 = __importDefault(require("./soccer"));
exports.SoccerIcon = soccer_1.default;
const sort_alphabetical_ascending_1 = __importDefault(require("./sort-alphabetical-ascending"));
exports.SortAlphabeticalAscendingIcon = sort_alphabetical_ascending_1.default;
const source_branch_1 = __importDefault(require("./source-branch"));
exports.SourceBranchIcon = source_branch_1.default;
const source_pull_1 = __importDefault(require("./source-pull"));
exports.SourcePullIcon = source_pull_1.default;
const square_1 = __importDefault(require("./square"));
exports.SquareIcon = square_1.default;
const star_outline_1 = __importDefault(require("./star-outline"));
exports.StarOutlineIcon = star_outline_1.default;
const star_1 = __importDefault(require("./star"));
exports.StarIcon = star_1.default;
const sync_1 = __importDefault(require("./sync"));
exports.SyncIcon = sync_1.default;
const table_large_1 = __importDefault(require("./table-large"));
exports.TableLargeIcon = table_large_1.default;
const thumbs_up_down_1 = __importDefault(require("./thumbs-up-down"));
exports.ThumbsUpDownIcon = thumbs_up_down_1.default;
const trash_can_outline_1 = __importDefault(require("./trash-can-outline"));
exports.TrashCanOutlineIcon = trash_can_outline_1.default;
const tune_1 = __importDefault(require("./tune"));
exports.TuneIcon = tune_1.default;
const update_1 = __importDefault(require("./update"));
exports.UpdateIcon = update_1.default;
const video_outline_1 = __importDefault(require("./video-outline"));
exports.VideoOutlineIcon = video_outline_1.default;
const view_grid_plus_outline_1 = __importDefault(require("./view-grid-plus-outline"));
exports.ViewGridPlusOutlineIcon = view_grid_plus_outline_1.default;
const volume_high_1 = __importDefault(require("./volume-high"));
exports.VolumeHighIcon = volume_high_1.default;
const webhook_incoming_1 = __importDefault(require("./webhook-incoming"));
exports.WebhookIncomingIcon = webhook_incoming_1.default;
const webhook_outgoing_1 = __importDefault(require("./webhook-outgoing"));
exports.WebhookOutgoingIcon = webhook_outgoing_1.default;
const webhook_1 = __importDefault(require("./webhook"));
exports.WebhookIcon = webhook_1.default;
const glyphMap = {
    'account-minus-outline': account_minus_outline_1.default,
    'account-multiple-outline': account_multiple_outline_1.default,
    'account-multiple-plus-outline': account_multiple_plus_outline_1.default,
    'account-outline': account_outline_1.default,
    'account-plus-outline': account_plus_outline_1.default,
    'airplane-variant': airplane_variant_1.default,
    airplane: airplane_1.default,
    'alert-circle-outline': alert_circle_outline_1.default,
    'alert-outline': alert_outline_1.default,
    'application-cog': application_cog_1.default,
    apps: apps_1.default,
    'archive-arrow-up-outline': archive_arrow_up_outline_1.default,
    'archive-outline': archive_outline_1.default,
    'arrow-back-ios': arrow_back_ios_1.default,
    'arrow-collapse': arrow_collapse_1.default,
    'arrow-down-bold-circle-outline': arrow_down_bold_circle_outline_1.default,
    'arrow-down': arrow_down_1.default,
    'arrow-expand-all': arrow_expand_all_1.default,
    'arrow-expand': arrow_expand_1.default,
    'arrow-forward-ios': arrow_forward_ios_1.default,
    'arrow-left': arrow_left_1.default,
    'arrow-right-bold-outline': arrow_right_bold_outline_1.default,
    'arrow-right': arrow_right_1.default,
    'arrow-up-bold-circle-outline': arrow_up_bold_circle_outline_1.default,
    'arrow-up': arrow_up_1.default,
    at: at_1.default,
    basketball: basketball_1.default,
    'beach-umbrella-outline': beach_umbrella_outline_1.default,
    'bell-off-outline': bell_off_outline_1.default,
    'bell-outline': bell_outline_1.default,
    'bookmark-outline': bookmark_outline_1.default,
    bookmark: bookmark_1.default,
    'brand-gitlab': brand_gitlab_1.default,
    'brand-google': brand_google_1.default,
    'brand-office-365': brand_office_365_1.default,
    'brand-one-login': brand_one_login_1.default,
    'brand-zoom': brand_zoom_1.default,
    'calendar-check-outline': calendar_check_outline_1.default,
    'calendar-month-outline': calendar_month_outline_1.default,
    'calendar-outline': calendar_outline_1.default,
    'camera-outline': camera_outline_1.default,
    cancel: cancel_1.default,
    'car-outline': car_outline_1.default,
    cellphone: cellphone_1.default,
    'chart-bar': chart_bar_1.default,
    'chart-line': chart_line_1.default,
    'check-all': check_all_1.default,
    'check-circle-outline': check_circle_outline_1.default,
    'check-circle': check_circle_1.default,
    check: check_1.default,
    'checkbox-blank-outline': checkbox_blank_outline_1.default,
    'checkbox-marked': checkbox_marked_1.default,
    'chevron-down-circle-outline': chevron_down_circle_outline_1.default,
    'chevron-down': chevron_down_1.default,
    'chevron-left': chevron_left_1.default,
    'chevron-right': chevron_right_1.default,
    'chevron-up': chevron_up_1.default,
    'circle-multiple-outline-lock': circle_multiple_outline_lock_1.default,
    'circle-multiple-outline': circle_multiple_outline_1.default,
    'circle-outline': circle_outline_1.default,
    'clock-outline': clock_outline_1.default,
    clock: clock_1.default,
    'close-circle-outline': close_circle_outline_1.default,
    'close-circle': close_circle_1.default,
    close: close_1.default,
    'code-brackets': code_brackets_1.default,
    'code-tags': code_tags_1.default,
    'cog-outline': cog_outline_1.default,
    console: console_1.default,
    'content-copy': content_copy_1.default,
    'credit-card-outline': credit_card_outline_1.default,
    'crown-outline': crown_outline_1.default,
    'currency-usd': currency_usd_1.default,
    'dock-left': dock_left_1.default,
    'dock-window': dock_window_1.default,
    'dots-horizontal': dots_horizontal_1.default,
    'dots-vertical': dots_vertical_1.default,
    'download-outline': download_outline_1.default,
    'drag-vertical': drag_vertical_1.default,
    draw: draw_1.default,
    'email-outline': email_outline_1.default,
    'email-plus-outline': email_plus_outline_1.default,
    'email-variant': email_variant_1.default,
    'emoticon-custom-outline': emoticon_custom_outline_1.default,
    'emoticon-happy-outline': emoticon_happy_outline_1.default,
    'emoticon-outline': emoticon_outline_1.default,
    'emoticon-plus-outline': emoticon_plus_outline_1.default,
    'exclamation-thick': exclamation_thick_1.default,
    'exit-to-app': exit_to_app_1.default,
    'export-variant': export_variant_1.default,
    'eye-off-outline': eye_off_outline_1.default,
    'eye-outline': eye_outline_1.default,
    'file-audio-outline-large': file_audio_outline_large_1.default,
    'file-audio-outline': file_audio_outline_1.default,
    'file-code-outline-large': file_code_outline_large_1.default,
    'file-code-outline': file_code_outline_1.default,
    'file-excel-outline-large': file_excel_outline_large_1.default,
    'file-excel-outline': file_excel_outline_1.default,
    'file-generic-outline-large': file_generic_outline_large_1.default,
    'file-generic-outline': file_generic_outline_1.default,
    'file-gif': file_gif_1.default,
    'file-image-broken-outline-large': file_image_broken_outline_large_1.default,
    'file-image-broken-outline': file_image_broken_outline_1.default,
    'file-image-outline-large': file_image_outline_large_1.default,
    'file-image-outline': file_image_outline_1.default,
    'file-multiple-outline-large': file_multiple_outline_large_1.default,
    'file-multiple-outline': file_multiple_outline_1.default,
    'file-patch-outline-large': file_patch_outline_large_1.default,
    'file-patch-outline': file_patch_outline_1.default,
    'file-pdf-outline-large': file_pdf_outline_large_1.default,
    'file-pdf-outline': file_pdf_outline_1.default,
    'file-powerpoint-outline-large': file_powerpoint_outline_large_1.default,
    'file-powerpoint-outline': file_powerpoint_outline_1.default,
    'file-text-outline-large': file_text_outline_large_1.default,
    'file-text-outline': file_text_outline_1.default,
    'file-video-outline-large': file_video_outline_large_1.default,
    'file-video-outline': file_video_outline_1.default,
    'file-word-outline-large': file_word_outline_large_1.default,
    'file-word-outline': file_word_outline_1.default,
    'file-zip-outline-large': file_zip_outline_large_1.default,
    'file-zip-outline': file_zip_outline_1.default,
    'filter-variant': filter_variant_1.default,
    fire: fire_1.default,
    'flag-outline': flag_outline_1.default,
    flag: flag_1.default,
    'flask-outline': flask_outline_1.default,
    'folder-move-outline': folder_move_outline_1.default,
    'folder-outline': folder_outline_1.default,
    'folder-plus-outline': folder_plus_outline_1.default,
    'food-apple': food_apple_1.default,
    'food-fork-drink': food_fork_drink_1.default,
    'format-bold': format_bold_1.default,
    'format-clear': format_clear_1.default,
    'format-header-1': format_header_1_1.default,
    'format-header-2': format_header_2_1.default,
    'format-header-3': format_header_3_1.default,
    'format-header-4': format_header_4_1.default,
    'format-header-5': format_header_5_1.default,
    'format-header-6': format_header_6_1.default,
    'format-header': format_header_1.default,
    'format-italic': format_italic_1.default,
    'format-letter-case': format_letter_case_1.default,
    'format-list-bulleted': format_list_bulleted_1.default,
    'format-list-numbered': format_list_numbered_1.default,
    'format-quote-open': format_quote_open_1.default,
    'format-strikethrough-variant': format_strikethrough_variant_1.default,
    'forum-outline': forum_outline_1.default,
    gfycat: gfycat_1.default,
    'github-circle': github_circle_1.default,
    glasses: glasses_1.default,
    globe: globe_1.default,
    hammer: hammer_1.default,
    'hand-right': hand_right_1.default,
    'heart-outline': heart_outline_1.default,
    'help-circle-outline': help_circle_outline_1.default,
    help: help_1.default,
    'home-variant-outline': home_variant_outline_1.default,
    'iframe-list-outline': iframe_list_outline_1.default,
    'image-area-outline': image_area_outline_1.default,
    'image-broken-outline': image_broken_outline_1.default,
    'image-outline': image_outline_1.default,
    infinity: infinity_1.default,
    'information-outline': information_outline_1.default,
    kanban: kanban_1.default,
    'key-variant-circle': key_variant_circle_1.default,
    'key-variant': key_variant_1.default,
    laptop: laptop_1.default,
    'layers-outline': layers_outline_1.default,
    'leaf-outline': leaf_outline_1.default,
    leaf: leaf_1.default,
    'lightbulb-outline': lightbulb_outline_1.default,
    'lightning-bolt-outline': lightning_bolt_outline_1.default,
    'link-variant-off': link_variant_off_1.default,
    'link-variant': link_variant_1.default,
    'lock-outline': lock_outline_1.default,
    lock: lock_1.default,
    'logout-variant': logout_variant_1.default,
    'magnify-minus': magnify_minus_1.default,
    'magnify-plus': magnify_plus_1.default,
    magnify: magnify_1.default,
    'mark-as-unread': mark_as_unread_1.default,
    mattermost: mattermost_1.default,
    'menu-down': menu_down_1.default,
    'menu-left': menu_left_1.default,
    'menu-right': menu_right_1.default,
    'menu-up': menu_up_1.default,
    'menu-variant': menu_variant_1.default,
    menu: menu_1.default,
    'message-check-outline': message_check_outline_1.default,
    'message-check': message_check_1.default,
    'message-minus-outline': message_minus_outline_1.default,
    'message-plus-outline': message_plus_outline_1.default,
    'message-text-outline': message_text_outline_1.default,
    'microphone-off': microphone_off_1.default,
    microphone: microphone_1.default,
    'minus-box': minus_box_1.default,
    'minus-circle-outline': minus_circle_outline_1.default,
    'minus-circle': minus_circle_1.default,
    minus: minus_1.default,
    monitor: monitor_1.default,
    'notebook-outline': notebook_outline_1.default,
    oauth: oauth_1.default,
    'open-in-new': open_in_new_1.default,
    'palette-outline': palette_outline_1.default,
    paperclip: paperclip_1.default,
    pause: pause_1.default,
    'pencil-outline': pencil_outline_1.default,
    'phone-hangup': phone_hangup_1.default,
    'phone-in-talk': phone_in_talk_1.default,
    'phone-outline': phone_outline_1.default,
    'pin-outline': pin_outline_1.default,
    pin: pin_1.default,
    play: play_1.default,
    'playlist-check': playlist_check_1.default,
    'plus-box-outline': plus_box_outline_1.default,
    'plus-box': plus_box_1.default,
    plus: plus_1.default,
    pound: pound_1.default,
    'power-plug-outline': power_plug_outline_1.default,
    'product-boards': product_boards_1.default,
    'product-channels': product_channels_1.default,
    'product-playbooks': product_playbooks_1.default,
    products: products_1.default,
    'radiobox-blank': radiobox_blank_1.default,
    'radiobox-marked': radiobox_marked_1.default,
    refresh: refresh_1.default,
    'reply-outline': reply_outline_1.default,
    'robot-happy': robot_happy_1.default,
    'search-list': search_list_1.default,
    'send-outline': send_outline_1.default,
    send: send_1.default,
    'server-outline': server_outline_1.default,
    'server-variant-plus': server_variant_plus_1.default,
    'server-variant': server_variant_1.default,
    'settings-outline': settings_outline_1.default,
    'share-variant-outline': share_variant_outline_1.default,
    'shield-alert-outline': shield_alert_outline_1.default,
    'shield-outline': shield_outline_1.default,
    sitemap: sitemap_1.default,
    'slash-forward-box-outline': slash_forward_box_outline_1.default,
    'slash-forward': slash_forward_1.default,
    soccer: soccer_1.default,
    'sort-alphabetical-ascending': sort_alphabetical_ascending_1.default,
    'source-branch': source_branch_1.default,
    'source-pull': source_pull_1.default,
    square: square_1.default,
    'star-outline': star_outline_1.default,
    star: star_1.default,
    sync: sync_1.default,
    'table-large': table_large_1.default,
    'thumbs-up-down': thumbs_up_down_1.default,
    'trash-can-outline': trash_can_outline_1.default,
    tune: tune_1.default,
    update: update_1.default,
    'video-outline': video_outline_1.default,
    'view-grid-plus-outline': view_grid_plus_outline_1.default,
    'volume-high': volume_high_1.default,
    'webhook-incoming': webhook_incoming_1.default,
    'webhook-outgoing': webhook_outgoing_1.default,
    webhook: webhook_1.default,
};
exports.default = glyphMap;
