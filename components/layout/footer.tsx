export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>© {currentYear} YanYu丨Cloud³ CMS. 保留所有权利。</p>
    </footer>
  )
}
