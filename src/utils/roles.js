const normalizeRoleSlug = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  const base = value.toString().trim();
  if (!base) {
    return null;
  }
  return base.toLowerCase().replace(/\s+/g, '_');
};

export const extractRoleSlugs = (input) => {
  if (!input) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.flatMap(extractRoleSlugs);
  }

  if (typeof input === 'object') {
    return extractRoleSlugs(
      input.role ?? input.name ?? input.slug ?? input.code ?? null
    );
  }

  const normalized = normalizeRoleSlug(input);
  return normalized ? [normalized] : [];
};

export const isVerifierRole = (roles) => {
  const slugs = extractRoleSlugs(roles);
  return slugs.includes('kepala_seksi');
};
