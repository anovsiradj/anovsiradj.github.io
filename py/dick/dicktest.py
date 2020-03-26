
if __name__ == '__main__':
	from dick import dick_001 as __dick__;
	from dick import dick_002 as __dick__;

import unittest

class DickTest(unittest.TestCase):
	print(__dick__)

	def test_01_dick_arguments_none(self):
		dick = __dick__()
		self.assertEqual(dick, {})
	# 
	def test_02_dick_arguments_dict(self):
		dick = { 'a':1, 'b':2, }
		self.assertEqual(__dick__(dick), dict(dick))

		self.assertEqual(__dick__( {'a':1}, {'b':2}, ), dict(dick))
	# 
	def test_03_dick_arguments_named(self):
		dick = __dick__( a=1, b=2, )
		self.assertEqual(dick, dict( a=1, b=2, ))

		dick = __dick__( a=1, b=2, )
		self.assertEqual(dick, dict( b=2, a=1, ))
	# 
	def test_04_dick_arguments_spread(self):
		dick0 = { 'a':1, 'b':2, }
		dick1 = { 'b':2, 'a':1, }
		self.assertEqual(__dick__(**dick0), dict(**dick0))
		self.assertEqual(__dick__(**dick1), dict(**dick1))
		self.assertEqual(__dick__(**dick0), dict(**dick1))
	# 
	def test_05_dick_arguments_mixed(self):
		self.assertEqual(__dick__( a=1, **{'b':2}, ), dict( a=1, **{'b':2}, ))
		self.assertEqual(__dick__( **{'a':1}, b=2, ), dict( **{'a':1}, b=2, ))
	# 

	def test_06_dick_getitem_noexists_is_none(self):
		dick = __dick__()
		self.assertEqual(dick['null'], None)
	# 
	def test_07_dick_getattr_noexists_is_none(self):
		dick = __dick__()
		self.assertEqual(dick.null, None)
	# 

	def test_08_dick_setitem(self):
		item = 1
		dick = __dick__()
		dick['a'] = item
		self.assertEqual(dick['a'], item)
	# 
	def test_09_dick_setattr(self):
		item = 2
		dick = __dick__()
		dick.b = item
		self.assertEqual(dick.b, item)
	# 

	def test_10_dick_item_is_attr_and_attr_is_item(self):
		dick = __dick__()

		dick.a = 1
		self.assertEqual(dick['a'], dick.a)

		dick['b'] = 2
		self.assertEqual(dick.b, dick['b'])
	# 

	def test_11_dick_delitem(self):
		dick = __dick__( a=1, b=2, )
		del dick['a']
		self.assertEqual(dick, { 'b':2, })

		del dick['b']
		self.assertEqual(dick, {})

		del dick['c']
	# 
	def test_12_dick_delattr(self):
		dick = __dick__( a=1, b=2, )
		del dick.a
		self.assertEqual(dick, { 'b':2, })

		del dick.b
		self.assertEqual(dick, {})

		del dick.c
	# 

	def test_13_dick_repr(self):
		dick0 = dict( **{'a':1}, b=2, )
		dick1 = __dick__( a=1, **{'b':2}, )
		self.assertEqual(repr(dick1), repr(dick0))
	# 
# 

if __name__ == '__main__': unittest.main();
